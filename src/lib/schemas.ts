import { z } from 'zod'
const MAX_FILE_SIZE = 2000000 // 2MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const RegisterSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'A senha deve possuir mais de 8 caracteres.' })
      .max(20, { message: 'A senha deve possuir menos de 20 caracteres.' })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(value),
        {
          message:
            'A senha deve conter pelo menos uma letra minúscula, uma maiúscula e um dígito.',
        },
      ),
    confirmPassword: z.string(),

    semester: z.coerce
      .string()
      .min(1, 'Semestre Inválido.')
      .max(8, 'Semestre Inválido.'),
    entrySemester: z.string().refine(
      (value) => {
        const currentYear = new Date().getFullYear()
        const entryYear = parseInt(value.split('.')[0], 10)
        return /^\d{4}\.(1|2)$/.test(value) && entryYear <= currentYear
      },
      {
        message:
          'O ano do período de ingresso não pode ser posterior ao ano atual e deve estar no formato ANO.SEMESTRE_LETIVO (ex: 2020.1, 2020.2, 2024.1, 2024.2)',
      },
    ),
    phone: z
      .string()
      .min(10, 'Número de telefone inválido.')
      .max(15, 'Número de telefone inválido.'),
    secondaryPhone: z
      .string()
      .min(10, 'Número de telefone inválido.')
      .max(15, 'Número de telefone inválido.')
      .optional()
      .or(z.literal('')),
    name: z
      .string()
      .min(3, 'Preencha com seu nome completo.')
      .max(30, 'Limite de 30 caracteres atingido')
      .regex(
        /^[a-zA-Z\sáéíóúãáçÃÁÉÍÓÚ]+$/,
        'O nome deve conter apenas letras A-Z a-z, espaços e acentos.',
      ),
    image: z
      .any()
      .refine((files) => files?.length >= 1, { message: 'Photo is required.' })
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: '.jpg, .jpeg, .png and .webp files are accepted.',
      })
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: `Max file size is 2MB.`,
      }),
    course: z.enum(['Ciência da Computação', 'Engenharia de Computação']),
    registrationNumber: z.string().refine((value) => /^\d{8}$/.test(value), {
      message: 'Formato de matrícula inválido',
    }),
    birthdate: z.date(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })

export type RegisterSchema = z.infer<typeof RegisterSchema>
