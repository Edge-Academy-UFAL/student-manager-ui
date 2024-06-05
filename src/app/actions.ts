'use server'
import { revalidatePath } from 'next/cache'

export async function revalidateUserPage(userId: string) {
  revalidatePath(`/alunos/${userId}/dados`, 'page')
}

export async function revalidateRecordPage(userId: string) {
  revalidatePath(`/alunos/${userId}/historico`, 'page')
}
