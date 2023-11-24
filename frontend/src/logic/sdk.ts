
// db.users: Signup table map<username, password>
// db.user: Current logged-in user
const db = localStorage

export function signup(username: string, password: string)
{
  if (!db.users)
    db.users = JSON.stringify({})

  const users = JSON.parse(db.users)
  if (users[username])
    throw new Error('User already exists')

  users[username] = password
}

export function login(username: string, password: string)
{
  const users = JSON.parse(db.users)
  if (users[username] !== password)
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
