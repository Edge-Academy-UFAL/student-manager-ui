import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function UserSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage
            src="https://media.discordapp.net/attachments/714891795129171983/1208605498815938590/8_orgid_55e84459-0f48-4ee1-9a01-9aa6365d593c.jpg?ex=65e3e495&is=65d16f95&hm=052aed2c6bb8f73bc582eabe248809ba492cc0e8490186a057031e65d40349c0&=&format=webp"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>
            Faça alterações em seu perfil aqui. Clique em salvar quando
            terminar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" value="Dirceu Caetano" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value="@dirceucaetano"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Salvar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
