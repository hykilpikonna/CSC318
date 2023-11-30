
import MandarinChinese from '../assets/img/lang/zh.svg'
import Japanese from '../assets/img/lang/ja.svg'

// db.users: Signup table map<username, password>
// db.user: Current logged-in user
const db = localStorage

const backendUrl = 'https://localhost:8000'

export interface Lang {
  name: string
  code: string
  icon: string
}

export const possibleLangs = [
  {name: 'Mandarin Chinese', code: 'zh', icon: MandarinChinese},
  {name: 'Japanese', code: 'ja', icon: Japanese},
]

export function signup(username: string, password: string, language: string)
{
  if (!db.users)
    db.users = JSON.stringify({})

  const users = JSON.parse(db.users)

  users[username] = {password, language}
  db.users = JSON.stringify(users)

  db.user = username
}

export function login(username: string, password: string)
{
  const users = JSON.parse(db.users)
  if (!users[username] || users[username].password !== password)
    throw new Error('Invalid credentials')

  db.user = username
}

export function logout()
{
  delete db.user
}

export function isLoggedIn()
{
  return !!db.user
}

export function getLanguage(username: string)
{
  const users = JSON.parse(db.users)
  return users[username].language
}

export function getUsername()
{
  return db.user
}

 async function post(endpoint: string, body: any) {
  const response = await fetch(`${backendUrl}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });

  return response;

 }

export interface CharacterChatCreationRequest 
{
  character: string;
  user_name: string;
  language: string;
}

export interface CharacterChatCreationResponse 
{
  // this shoudl be of type UUID
  chat_id: string;
}

export async function startFictionalChat(character: string): Promise<CharacterChatCreationResponse> {
  const currUser = getUsername();
  const language = getLanguage(currUser);
  
  const request: CharacterChatCreationRequest = {
    character: character,
    user_name: currUser,
    language: language
  };

  console.log('Sending request:', request);
  
  const response = await fetch(`${backendUrl}/character-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
  }

  return await response.json();
}

// export interface 