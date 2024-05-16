/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

const token = cookies().get('token')?.value

export const addNota = async (data: any) => {
  'use server'
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
