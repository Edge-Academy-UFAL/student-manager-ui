/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { revalidateTag } from 'next/cache'

export const editGrade = async (data: any) => {
  'use server'

  const session = await getServerSession(authOptions)
  const token = session?.user.authToken

  console.log(data)

  try {
    const res = await fetch(`http://127.0.0.1:8080/api/v1/grades`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data),
    })

    console.log(res)

    if (!res.ok) {
      throw new Error('Erro ao editar nota')
    }

    revalidateTag('disciplinas-table')

    return true
  } catch (error) {
    return false
  }
}
