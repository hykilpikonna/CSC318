
# Language Learning App API Documentation

This document outlines the API endpoints for a language learning application, detailing the functionalities related to AI marking, chat interactions, character interactions, and speech recognition.

## Endpoints

### AI Marking (`/ai-mark`)
- **Method:** POST
- **Description:** Marks a user's answer to a language learning question.
- **Request Body:** `AIMarkRequest`
  - `question`: The question posed to the user.
  - `user_answer`: The user's response to the question.
  - `expected`: The expected correct answer.
  - `chapter`: The chapter from which the question is taken.
  - `language`: The language in which the question is asked.
- **Response:** `AIMarkResponse`
  - `correct`: Boolean indicating if the answer is correct.
  - `reason`: Reason for the marking.
- **Example Request:** `{ "question": "What is your name?", "user_answer": "My name is John", "expected": "My name is [Name]", "chapter": "Introduction", "language": "English" }`
- **Example Response:** `{ "correct": true, "reason": "The answer is grammatically correct and matches the expected pattern." }`

### Human Chat Creation (`/human-chat`)
- **Method:** POST
- **Description:** Creates a new chat session for language learning.
- **Request Body:** `HumanChatCreationRequest`
  - `user_name`: Name of the language learner.
  - `user_hobbies`: List of hobbies of the language learner.
  - `target_name`: Name of the target individual for the chat.
  - `target_hobbies`: List of hobbies of the target individual.
  - `language`: Language of the chat.
- **Response:** `HumanChatCreationResponse`
  - `session_id`: UUID of the newly created chat session.
- **Example Request:** `{ "user_name": "Alice", "user_hobbies": ["reading", "writing"], "target_name": "Bob", "target_hobbies": ["gaming", "cooking"], "language": "Spanish" }`
- **Example Response:** `{ "session_id": "123e4567-e89b-12d3-a456-426614174000" }`


### Human Chat Message (`/human-chat/{session_id}`)
- **Method:** POST
- **Description:** Sends a message in a human chat session and receives a response.
- **URL Parameter:** `session_id` - UUID of the chat session.
- **Request Body:** `HumanChatMessageRequest`
  - `msg`: The message sent by the user.
- **Response:** `HumanChatMessageResponse`
  - `msg`: The AI-generated response message.
- **Example Request:** `{ "msg": "How is the weather today?" }`
- **Example Response:** `{ "msg": "It's quite sunny here. Perfect for a walk!" }`

### Character Chat Creation (`/character-chat`)
- **Method:** POST
- **Description:** Initializes a chat session with a fictional character for language learning.
- **Request Body:** `CharacterChatCreationRequest`
  - `character`: Name of the character for the chat session.
  - `user_name`: Name of the user engaging in the chat.
  - `language`: The language in which the conversation will occur.
- **Response:** `CharacterChatCreationResponse`
  - `session_id`: UUID of the created character chat session.
- **Example Request:** `{ "character": "ash_pokemon", "user_name": "Alice", "language": "Japanese" }`
- **Example Response:** `{ "session_id": "123e4567-e89b-12d3-a456-426614174000" }`

### Character Chat Message (`/character-chat/{session_id}`)
- **Method:** POST
- **Description:** Engages in a conversation with a fictional character.
- **URL Parameter:** `session_id` - UUID of the character chat session.
- **Request Body:** `CharacterChatMessageRequest`
  - `msg`: User's message to the character.
- **Response:** `CharacterChatMessageResponse`
  - `msg`: The character's response.
  - `audio_id`: UUID for the audio version of the character's response.
- **Example Request:** `{ "msg": "Tell me about your latest adventure!" }`
- **Example Response:** `{ "msg": "I just won a gym badge in a thrilling battle!", "audio_id": "456f7890-f12a-34b5-c678-901234567890" }`

### Speech Recognition (`/recognize`)
- **Method:** POST
- **Description:** Converts spoken words in an audio file to text.
- **Request Body:**
  - `audio_file`: An audio file uploaded using `UploadFile`.
- **Response:** `RecognizeResponse`
  - `text`: Transcribed text from the audio file.
- **Example Response:** `{ "text": "Hello, how can I help you today?" }`

### Retrieve Audio (`/audio/{UUID}`)
- **Method:** GET
- **Description:** Retrieves the audio response corresponding to a given UUID.
- **URL Parameter:** `UUID` - Unique identifier for the audio file.
- **Response:** Streaming audio content in `audio/mpeg` format.
- **Note:** Returns a 404 error if the audio is not found.

## Development

Run `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365` to generate a self-signed certificate for HTTPS.