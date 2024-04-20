import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface SelectCourseProps {
  course: string
  setCourse: (course: string) => void
  children: React.ReactNode
}

const SelectCourse = ({ course, setCourse, children }: SelectCourseProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuLabel>Selecione seu curso:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={course} onValueChange={setCourse}>
          <DropdownMenuRadioItem value="Ciência da Computação">
            Ciência da Computação
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Engenharia de Computação">
            Engenharia de Computação
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SelectCourse
