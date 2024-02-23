import { Separator } from '@/components/ui/separator'
import { AccountForm } from './account-form'

const getData = async () => {
  const res = await fetch(`http://localhost:3333/profile-settings`, {
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

export default async function SettingsAccountPage() {
  const data = await getData()
  console.log(data)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
