import { useAuth } from '@/contexts/auth'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from './ui/use-toast'

export function DeleteStudent(props: { name: string; email: string }) {
  const { token } = useAuth()
  const { toast } = useToast()

  async function handleDelete() {
    const res = await fetch(
      'http://localhost:8080/api/v1/students/' + props.email,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (res.ok) {
      toast({
        title: 'Aluno removido com sucesso',
        description: 'O aluno foi removido com sucesso',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Não foi possível remover o aluno',
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full h-full" asChild>
        <div>Desligar Aluno</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja remover o aluno {props.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar você estará desligando o aluno {props.name}. Esta ação
            não pode ser desfeita. Isto irá deletar permanentemente sua conta e
            remover seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
