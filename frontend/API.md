
> For the demo, language ∈ {EN_JA, EN_ZH-CN}

POST /ai-mark {
	question: str, 
	user_answer: str, 
	expected: str, 
	chapter: str,
	language: str
}
-> {correct: bool, reason: str}

POST /human-chat {
	target_name: str,
	target_hobbies: list\[str],
	history: list\[{from\_me: bool, msg: str}],
	language: str
}
-> {msg: str}

> Chat histories will be stored in localStorage

POST /recognize (Body is an audio file)
-> {text: str}

POST /character-chat {
	character: str
	history: list\[{from_me: bool, msg: str}]
	language: str
}
-> {msg: str, audio: UUID}

GET /audio/{UUID}