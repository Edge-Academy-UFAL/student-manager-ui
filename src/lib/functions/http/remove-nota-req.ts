/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { revalidateTag } from 'next/cache'

export const removeGrade = async (data: any) => {
  'use server'

  const session = await getServerSession(authOptions)
  const token = session?.user.authToken

  try {
    const res = await fetch(`${process.env.backendRoute}/api/v1/grades`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Erro ao remover nota')
    }

    revalidateTag('disciplinas-table')

    return true
  } catch (error) {
    return false
  }
}
