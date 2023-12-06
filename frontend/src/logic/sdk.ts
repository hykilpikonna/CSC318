
import MandarinChinese from '../assets/img/lang/zh.svg'
import Japanese from '../assets/img/lang/ja.svg'
import Spanish from '../assets/img/lang/es.svg'
import English from '../assets/img/lang/en.svg'
import {Chapter, chapters_jp, chapters_es} from "./CourseData";

// db.users: Signup table map<username, password>
// db.user: Current logged-in user
const db = localStorage

// const backendUrl = 'https://318-bk.hydev.org'
const backendUrl = "https://127.0.0.1:8000"

export interface Lang {
  name: string
  code: string
  icon: string
  data: Chapter[]
}

export const possibleLangs: Lang[] = [
  // {name: 'Mandarin Chinese', code: 'zh', icon: MandarinChinese, data: []},
  {name: 'Japanese', code: 'ja', icon: Japanese, data: chapters_jp},
  {name: 'Spanish', code: 'es', icon: Spanish, data: chapters_es},
  // {name: 'English', code: 'en', icon: English, data: []},
]

export function signup(username: string, password: string, language: string)
{
  if (!db.users)
    db.users = JSON.stringify({})

  const users = JSON.parse(db.users)

  users[username] = {password, language, "experience": 10, "completed_modules": [], "day_streak": 0, "speaking": 0}
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

export function getUsername()
{
  return db.user
}

export function getXp()
{
  if (!db.completed) return 0
  const completed = JSON.parse(db.completed)
  return completed.length * 20
}

export function isStepCompleted(chapter: string, step: number)
{
  if (!db.completed) return false
  const completed = JSON.parse(db.completed)
  return completed.includes(`${chapter}-${step}`)
}

export function setStepCompleted(chapter: string, step: number)
{
  if (!db.completed)
    db.completed = JSON.stringify([])
  const completed = JSON.parse(db.completed)
  completed.push(`${chapter}-${step}`)
  db.completed = JSON.stringify(completed)
}

export function getLanguage(): Lang
{
  const users = JSON.parse(db.users)
  const lang = users[getUsername()].language
  if (!lang)
  {
    alert('No language set, logging out')
    logout()
    window.location.href = '/'
  }
  const lang_obj = possibleLangs.find(l => l.name === lang)!
  if (!lang_obj)
  {
    alert(`Invalid language set: ${lang}, logging out`)
    logout()
    window.location.href = '/'
  }
  return lang_obj
}

export interface CharacterChatCreationRequest 
{
  character: string;
  user_name: string;
  language: string;
}

export interface ChatCreationResponse 
{
  chat_id: string;
}

export async function startFictionalChat(character: string): Promise<ChatCreationResponse> {
  const currUser = getUsername();
  const language = getLanguage();
  
  const request: CharacterChatCreationRequest = {
    character: character,
    user_name: currUser,
    language: language.name
  };
  
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

  const json = await response.json();
  return json.session_id;
}

export interface HumanChatCreationRequest
{
  user_name: string;
  user_hobbies: string[];
  target_name: string;
  target_hobbies: string[];
  language: string;
}

export async function startHumanChat(user_hobbies: string[], target_name: string, target_hobbies: string[]): Promise<ChatCreationResponse> {

  const request: HumanChatCreationRequest = {
    user_name: getUsername(),
    user_hobbies: user_hobbies,
    target_name: target_name,
    target_hobbies: target_hobbies,
    language: getLanguage().name
  };

  const response = await fetch(`${backendUrl}/human-chat`, {
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

  const json = await response.json();
  return json.session_id;
}

export async function speechToText(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio_file', audioBlob, 'audio.wav');

  const response = await fetch(`${backendUrl}/recognize`, {
      method: 'POST',
      body: formData,
  });

  const json = await response.json();

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${json.message}`);
  }

  return json.text;
}

export async function characterChatMessage(sessionId: string, message: string): Promise<{ msg: string, audio_id: string }> {

  const request = {msg : message};

  const response = await fetch(`${backendUrl}/character-chat/${sessionId}`, {
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

  const json = await response.json();
  return json;
}

export async function humanChatMessage(sessionId: string, message: string): Promise<{ msg: string, audio_id: string }> {

  const request = {msg : message};

  const response = await fetch(`${backendUrl}/human-chat/${sessionId}`, {
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

  const json = await response.json();
  return json;
}

export async function getAudio(audioId: string): Promise<Blob> {
  const response = await fetch(`${backendUrl}/audio/${audioId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  return blob;
}

export interface UserQuestionRequest 
{
  question: string;
  user_answer: string;
  expected: string;
  chapter: string;
  language: string;
}

export interface UserQuestionFeedbackResponse 
{
  correct: string;
  reason: string;
}

export async function getAIMarking(question: string, user_answer: string, expected: string, chapter: string, language: string): Promise<UserQuestionFeedbackResponse> {
  const request: UserQuestionRequest = {
    question: question,
    user_answer: user_answer,
    expected: expected,
    chapter: chapter,
    language: language
  };
  
  const response = await fetch(`${backendUrl}/ai-mark`, {
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

  const json = await response.json();
  return json;
}
