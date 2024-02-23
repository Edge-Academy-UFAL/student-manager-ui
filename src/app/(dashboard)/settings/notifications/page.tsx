import { NotificationsForm } from './notifications-form'

const getData = async () => {
  const res = await fetch(
    `https://json-server-edge-academy.vercel.app/notifications`,
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

export default async function SettingsNotificationsPage() {
  const data = await getData()
  console.log(data)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notificações</h3>
        <p className="text-sm text-muted-foreground">
          Configure como você deseja receber notificações.
        </p>
      </div>
      <NotificationsForm />
    </div>
  )
}
