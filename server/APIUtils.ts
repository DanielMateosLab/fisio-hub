import { NextApiRequest } from 'next'
import { Professional, User, WithoutPassword } from 'common/entityTypes'
import { ResponseBody } from '../common/APITypes'

export const extractAuthData = (req: NextApiRequest): { user?: WithoutPassword<User>, professional?: Professional } => {
  const data = req.user
  delete data.user.password

  return data
}

export async function fetchPostOrPut(path: string, body: {}, method: 'POST' | 'PUT' = 'POST'): Promise<ResponseBody> {
  try {
    const res = await fetch(path, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return await res.json()
  } catch (e) {
    return {
      status: 'error',
      message: `Error conectando al servidor. ${e.name || 'Comprueba tu conexión y vuelve a intentarlo'}.`
    }
  }
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json() as Promise<ResponseBody>)