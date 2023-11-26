
import MandarinChinese from '../assets/img/lang/zh.svg'
import Japanese from '../assets/img/lang/ja.svg'

// db.users: Signup table map<username, password>
// db.user: Current logged-in user
const db = localStorage

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
