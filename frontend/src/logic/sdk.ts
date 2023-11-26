
// db.users: Signup table map<username, password>
// db.user: Current logged-in user
const db = localStorage

export function signup(username: string, password: string)
{
  if (!db.users)
    db.users = JSON.stringify({})

  const users = JSON.parse(db.users)

  users[username] = password
  db.users = JSON.stringify(users)
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