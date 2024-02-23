import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from './appearance-form'

export default function SettingsAppearancePage() {
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
