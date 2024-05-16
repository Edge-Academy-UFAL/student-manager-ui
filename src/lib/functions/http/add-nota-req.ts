/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { revalidateTag } from 'next/cache'

export const addGrade = async (data: any) => {
  'use server'

  const session = await getServerSession(authOptions)
  const token = session?.user.authToken

  try {
    const res = await fetch(`http://127.0.0.1:8080/api/v1/grades`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Erro ao adicionar nota')
    }

    revalidateTag('disciplinas-table')

    return true
  } catch (error) {
    return false
  }
}
