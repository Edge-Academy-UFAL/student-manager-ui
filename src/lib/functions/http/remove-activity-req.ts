/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { revalidateTag } from 'next/cache'

export const removeActivity = async (data: any) => {
  'use server'

  const session = await getServerSession(authOptions)
  const token = session?.user.authToken

  console.log(data)

  try {
    const res = await fetch(`${process.env.backendRoute}/api/v1/activities`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Erro ao remover atividade')
    }

    revalidateTag('user-data')

    return true
  } catch (error) {
    return false
  }
}
