import { Config } from '@utils/constant.utils'

export const login = async (username: string, password: string) => {
  const url = `${Config.urlBase}auth/login`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}
