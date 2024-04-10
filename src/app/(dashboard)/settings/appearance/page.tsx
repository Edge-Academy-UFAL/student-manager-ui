/* eslint-disable @typescript-eslint/no-unused-vars */
import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from './appearance-form'

const prodURL = `https://json-server-edge-academy.vercel.app/appearance`
const devURL = `http://localhost:3333/appearance`

// se quiser testar com dados no localhost basta mudar a url para "devURL" e rodar "pnpm json-server server.json -w -p 3333" no terminal
// lembrar de trocar de volta para a url do "prodURL" antes de fazer o commit para não dar erro no build
const getData = async () => {
  const res = await fetch(prodURL, {
    // next: {
    //   revalidate: 15, // dessa forma, a cada 15 segundos a página será atualizada
    // },
    cache: 'no-store',
  })

  if (!res.ok) {
    return null
  }

  return res.json()
}

export default async function SettingsAppearancePage() {
  const data = await getData()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aparência</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Costumize a aparência do seu aplicativo de acordo com suas
          preferências.
        </p>
      </div>
      <Separator />
      <AppearanceForm data={data} />
    </div>
  )
}
