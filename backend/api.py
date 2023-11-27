from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, UUID4
from typing import List, Dict, Union, Optional
import uuid
from dotenv import load_dotenv
from openai import OpenAI
from openai.types.chat import ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam, \
    ChatCompletionAssistantMessageParam
from tempfile import TemporaryDirectory
from starlette.responses import FileResponse
import json
from dataclasses import dataclass
import torch
from transformers import pipeline

load_dotenv()

app = FastAPI()
openai_client = OpenAI()


class AIMarkRequest(BaseModel):
    question: str
    user_answer: str
    expected: str
    chapter: str
    language: str


class AIMarkResponse(BaseModel):
    correct: bool
    reason: str


@app.post("/ai-mark", response_model=AIMarkResponse)
def ai_mark(request: AIMarkRequest):
    marking_system_prompt = f"""
    You are a marking system for a language learning app. 
    You are marking a question from a chapter on {request.chapter} in {request.language}.
    Please mark the user's answer as correct or incorrect and give a reason for your marking.
    Output in the following JSON format: {{"correct": bool, "reason": str}}
    """
    user_prompt = f"""
    The question is: {request.question}
    The user's answer is: {request.user_answer}
    The expected answer is: {request.expected}
    """
    completion = openai_client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {"role": "system", "content": marking_system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"}
    )
    response = json.loads(completion.choices[0].message.content)
    if "correct" not in response or "reason" not in response:
        raise HTTPException(status_code=500, detail="Invalid response from OpenAI")
    return AIMarkResponse(correct=response["correct"], reason=response["reason"])


CHAT_HISTORIES = {}


class ChatHistory:
    def __init__(self, session_id: UUID4, system_prompt: str):
        self.session_id = session_id
        self.history = []
        self.add_message(ChatCompletionSystemMessageParam(content=system_prompt, role="system"))

    def add_human_message(self, message: str):
        self.add_message(ChatCompletionUserMessageParam(content=message, role="user"))

    def add_message(self, message: Union[
        ChatCompletionAssistantMessageParam, ChatCompletionUserMessageParam, ChatCompletionSystemMessageParam]):
        self.history.append(message)

    def generate_and_record_message(self):
        completion = openai_client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=self.history,
        )
        message = completion.choices[0].message
        self.add_message(ChatCompletionAssistantMessageParam(content=message.content, role="assistant"))
        return message


class HumanChatCreationRequest(BaseModel):
    user_name: str
    user_hobbies: List[str]
    target_name: str
    target_hobbies: List[str]
    language: str


class HumanChatCreationResponse(BaseModel):
    session_id: UUID4


@app.post("/human-chat", response_model=HumanChatCreationResponse)
def human_chat_creation(request: HumanChatCreationRequest):
    session_id = uuid.uuid4()
    system_prompt = f"""
            Your name is {request.target_name} and are playing the role of a human chatting to a person named {request.user_name} who likes {request.user_hobbies}.
            Your hobbies are {request.target_hobbies}.
            They are a language learner trying to learn {request.language}. Please help them learn by chatting with them
            in the language but do not act like a robot. Try to be as human as possible.
            """
    CHAT_HISTORIES[session_id] = ChatHistory(session_id, system_prompt)
    return HumanChatCreationResponse(session_id=session_id)


class HumanChatMessageRequest(BaseModel):
    msg: str


class HumanChatMessageResponse(BaseModel):
    msg: str


@app.post("/human-chat/{session_id}", response_model=HumanChatMessageResponse)
def human_chat_message(session_id: UUID4, request: HumanChatMessageRequest):
    if session_id not in CHAT_HISTORIES:
        raise HTTPException(status_code=404, detail="Session ID not found")
    history = CHAT_HISTORIES[session_id]
    history.add_human_message(request.msg)
    message = history.generate_and_record_message()
    return HumanChatMessageResponse(msg=message.content)


class CharacterChatCreationRequest(BaseModel):
    character: str
    user_name: str
    language: str


class CharacterChatCreationResponse(BaseModel):
    session_id: UUID4


def get_character_prompt(character: str, user_name: str, language: str):
    if character == "ash_pokemon":
        return f"""
            You are playing the role of Ash Ketchum, a Pokemon trainer chatting to a person named {user_name}.
            They are a language learner trying to learn {language}. Please help them learn by chatting with them in the language
            but do not act like a robot. Try to be as human as possible.
            """

    raise HTTPException(status_code=404, detail="Character not found")


@app.post("/character-chat", response_model=CharacterChatCreationResponse)
def character_chat(request: CharacterChatCreationRequest):
    session_id = uuid.uuid4()
    system_prompt = get_character_prompt(request.character, request.user_name, request.language)
    CHAT_HISTORIES[session_id] = ChatHistory(session_id, system_prompt)
    return HumanChatCreationResponse(session_id=session_id)


class CharacterChatMessageRequest(BaseModel):
    msg: str


class CharacterChatMessageResponse(BaseModel):
    msg: str
    audio_id: UUID4


PENDING_AUDIO = {}


@app.post("/character-chat/{session_id}", response_model=CharacterChatMessageResponse)
def character_chat_message(session_id: UUID4, request: CharacterChatMessageRequest):
    if session_id not in CHAT_HISTORIES:
        raise HTTPException(status_code=404, detail="Session ID not found")
    history = CHAT_HISTORIES[session_id]
    history.add_human_message(request.msg)
    message = history.generate_and_record_message()
    audio_id = uuid.uuid4()
    PENDING_AUDIO[audio_id] = message.content
    return CharacterChatMessageResponse(msg=message.content, audio_id=audio_id)


class RecognizeResponse(BaseModel):
    text: str


pipe = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-large-v2",
    torch_dtype=torch.float16,
    device="mps",
)


@app.post("/recognize", response_model=RecognizeResponse)
def recognize(audio_file: UploadFile = File(...)):
    with TemporaryDirectory() as tmpdir:
        filename = tmpdir + "/audio.wav"
        with open(filename, "wb") as f:
            f.write(audio_file.file.read())
        outputs = pipe(filename,
                       chunk_length_s=30,
                       batch_size=1,
                       return_timestamps=True)
    return RecognizeResponse(text=outputs["text"].strip())


@app.get("/audio/{UUID}")
def get_audio(UUID: UUID4):
    if UUID not in PENDING_AUDIO:
        raise HTTPException(status_code=404, detail="Audio not found")
    if isinstance(PENDING_AUDIO[UUID], str):
        audio_text = PENDING_AUDIO[UUID]
        del PENDING_AUDIO[UUID]
        response = openai_client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=audio_text
        )
        PENDING_AUDIO[UUID] = response
    return StreamingResponse(PENDING_AUDIO[UUID].iter_bytes(chunk_size=1024), media_type="audio/mpeg")


@app.get("/")
def read_root():
    return FileResponse("test.html")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, ssl_keyfile="key.pem", ssl_certfile="cert.pem")
