/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { revalidateTag } from 'next/cache'

export const editInfo = async (data: any) => {
  'use server'

  const session = await getServerSession(authOptions)
  const token = session?.user.authToken
  const email = session?.user.email

  try {
    const res = await fetch(
      `${process.env.backendRoute}/api/v1/students/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
      },
    )

    if (!res.ok) {
      throw new Error('Erro ao editar os dados')
    }

    console.log('RESULAOTO', res.json())

    revalidateTag('user-data')

    return {
      status: res.status,
    }
  } catch (error) {
    return {
      status: 500,
    }
  }
}
