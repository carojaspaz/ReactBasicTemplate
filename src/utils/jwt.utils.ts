import { jwtDecode } from 'jwt-decode'

interface user {
  name: string
  email: string
  role: string
  pic: string
}

export const decodeJwt = (token: string): user | null => {
  try {
    const decoded: any = jwtDecode(token)
    console.log('Token decodificado:', decoded)
    return {
      name: decoded.name || '',
      email: decoded.email || '',
      role: decoded.role || '',
      pic: decoded.pic || '',
    }
  } catch (error) {
    return null
  }
}
