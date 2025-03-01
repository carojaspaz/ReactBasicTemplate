import { http, HttpResponse } from 'msw'
import { Config } from '@utils/constant.utils'

interface LoginRequestBody {
  username: string
  password: string
}

export const handlers = [
  http.post<{}, LoginRequestBody>(`${Config.urlBase}auth/login`, async ({ request }) => {
    const { username, password } = await request.json()
    if (username === 'admin@gmail.com' && password === '!qa2ws3ed4rf') {
      return HttpResponse.json(
        {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9uIERvZSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwicGljIjoiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy85Lzk5L1NhbXBsZV9Vc2VyX0ljb24ucG5nIn0.55MlTr08dQBm4GDjdFRJMbDl_w7tOas033BPsZVURrM',
        },
        { status: 200 }
      )
    }
    return HttpResponse.json({ message: 'Credenciales invalidas' }, { status: 401 })
  }),
]
