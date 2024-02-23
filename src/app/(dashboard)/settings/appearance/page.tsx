import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from './appearance-form'

const getData = async () => {
  const res = await fetch(
    `https://https://json-server-edge-academy.vercel.app/appearance`,
    {
      // next: {
      //   revalidate: 15, // dessa forma, a cada 15 segundos a página será atualizada
      // },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    return null
  }

  return res.json()
}

export default async function SettingsAppearancePage() {
  const data = await getData()
  console.log(data)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aparência</h3>
        <p className="text-sm text-muted-foreground">
          Costumize a aparência do seu aplicativo de acordo com suas
          preferências.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}
