import { Separator } from '@/components/ui/separator'
import { ProfileForm } from './profile-form'

const getData = async () => {
  const res = await fetch(
    `https://https://json-server-edge-academy.vercel.app/profile-settings`,
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

export default async function SettingsProfilePage() {
  const data = await getData()
  console.log(data)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Isso é como as pessoas verão você no site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
