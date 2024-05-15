'use client'

import * as React from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { ArrowDownWideNarrow } from 'lucide-react'
import { Separator } from '../ui/separator'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function DropdownFilters() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mb-3 p-3 text-end self-end text-foreground bg-background hover:bg-muted">
          <ArrowDownWideNarrow size={19} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-3 shadow-sm">
        <Label className="font-bold text-[0.9rem]">Ordenar por:</Label>
        <Separator className="mb-3 mt-1" />
        <RadioGroup className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subject" id="r1" />
            <Label htmlFor="r1">A-Z</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="period" id="r2" />
            <Label htmlFor="r2">Período</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="finalGrade" id="r3" />
            <Label htmlFor="r3">Média Final</Label>
          </div>
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
