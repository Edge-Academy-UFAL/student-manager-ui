import { Separator } from '@/components/ui/separator'
import { ProfileForm } from './profile-form'
export default function SettingsProfilePage() {
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
