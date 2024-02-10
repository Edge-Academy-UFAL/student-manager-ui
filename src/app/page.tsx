import { ModeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold">Gerenciador de Alunos</h1>
        <p className="text-center mt-3">Edge Academy</p>
      </div>
      <ModeToggle />
    </main>
  )
}
