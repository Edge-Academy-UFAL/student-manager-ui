'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Checkbox } from '@/components/ui/checkbox'

import { FilterFn } from '@tanstack/react-table'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import MultipleSelector, { Option } from '@/components/ui/multiple-selector'

import {
  FilterOptionSelect,
  NumberFilteringOption,
} from '@/components/custom-select'

import { Filter } from 'lucide-react'

import { Student } from '@/components/table'
import { Badge } from '@/components/ui/badge'

interface FilterData {
  csCheckbox: boolean
  ceCheckbox: boolean
  admissionSemester?: string
  admissionSemestreFilterOption?: NumberFilteringOption
  currentSemester?: number | ''
  currentSemesterFilterOption?: NumberFilteringOption
  cr?: number | ''
  crFilterOption?: NumberFilteringOption
  studentGroups?: Array<{ label: string; value: string; group: string }>
}

const filterDefaults: FilterData = {
  csCheckbox: true,
  ceCheckbox: true,
  admissionSemester: '',
  admissionSemestreFilterOption: NumberFilteringOption.GreaterThan,
  currentSemester: '',
  currentSemesterFilterOption: NumberFilteringOption.GreaterThan,
  cr: '',
  crFilterOption: NumberFilteringOption.GreaterThan,
  studentGroups: [],
}

function admissionSemesterFilter(
  rowValue: string,
  filterValue: string,
  filterOption: NumberFilteringOption,
) {
  const [yearPart, semesterPart] = rowValue.split('.').map((value) => {
    return Number(value)
  })
  const [filterYearPart, filterSemesterPart] = filterValue
    .split('.')
    .map((value) => {
      return Number(value)
    })

  const greaterOrEqualToFn = () => {
    if (yearPart > filterYearPart) {
      return true
    } else if (yearPart === filterYearPart) {
      if (semesterPart >= filterSemesterPart) {
        return true
      }
    }
    return false
  }

  const lessOrEqualToFn = () => {
    if (yearPart < filterYearPart) {
      return true
    } else if (yearPart === filterYearPart) {
      if (semesterPart <= filterSemesterPart) {
        return true
      }
    }
    return false
  }

  switch (filterOption) {
    case NumberFilteringOption.EqualTo:
      return rowValue === filterValue
    case NumberFilteringOption.GreaterOrEqualTo:
      return greaterOrEqualToFn()
    case NumberFilteringOption.GreaterThan:
      return !lessOrEqualToFn()
    case NumberFilteringOption.LessOrEqualTo:
      return lessOrEqualToFn()
    case NumberFilteringOption.LessThan:
      return !greaterOrEqualToFn()
  }
}

function numberFilter(
  rowValue: number,
  filterValue: number,
  filterOption: NumberFilteringOption,
) {
  switch (filterOption) {
    case NumberFilteringOption.EqualTo:
      return rowValue === filterValue
    case NumberFilteringOption.GreaterOrEqualTo:
      return rowValue >= filterValue
    case NumberFilteringOption.GreaterThan:
      return rowValue > filterValue
    case NumberFilteringOption.LessOrEqualTo:
      return rowValue <= filterValue
    case NumberFilteringOption.LessThan:
      return rowValue < filterValue
  }
}

function courseFilter(
  rowValue: string,
  csCheckboxValue: boolean,
  ceCheckboxValue: boolean,
) {
  if (rowValue === 'COMPUTER_SCIENCE') {
    return csCheckboxValue
  } else if (rowValue === 'COMPUTER_ENGINEERING') {
    return ceCheckboxValue
  }
}

const tableGlobalFilterFn: FilterFn<Student> = (row, _, value) => {
  // If no action is taken in the form, value is a empty object.
  // If no action is taken, no filters are applied
  if (Object.keys(value).length === 0) {
    return true
  }

  // Get the row data
  const student: Student = row.original

  if (!courseFilter(student.course, value.csCheckbox, value.ceCheckbox)) {
    return false
  }

  if (
    value.admissionSemester !== '' &&
    !admissionSemesterFilter(
      student.entryPeriod,
      value.admissionSemester,
      value.admissionSemestreFilterOption,
    )
  ) {
    return false
  }

  if (
    value.currentSemester &&
    !numberFilter(
      Number(student.period),
      value.currentSemester,
      value.currentSemesterFilterOption,
    )
  ) {
    return false
  }

  // This will be available in the future. Do not remove!
  // if (
  //   value.cr &&
  //   !numberFilter(student.cr, value.cr, value.crFilterOption)
  // ) {
  //   return false
  // }

  if (
    value.studentGroups.length > 0 &&
    !value.studentGroups.some(
      (obj: object) =>
        'group' in obj && Number(obj.group) === Number(student.studentGroup),
    )
  ) {
    return false
  }

  return true
}

const formSchema = z.object({
  csCheckbox: z.boolean().default(false).optional(),
  ceCheckbox: z.boolean().default(false).optional(),
  admissionSemester: z
    .string()
    .regex(/\d\d\d\d.[12]/i, {
      message:
        'O período de ingresso tem padrão ano.semestre (e.g. 2022.2). Os valores do semestre só podem ser 1 ou 2.',
    })
    .length(6, {
      message: 'O período de ingresso tem apenas 6 caracteres.',
    })
    .optional()
    .or(z.literal('')),
  admissionSemestreFilterOption: z.nativeEnum(NumberFilteringOption),
  currentSemester: z.coerce
    .number()
    .min(1, {
      message: 'Período atual menor que 1 não faz sentido.',
    })
    .max(15, {
      message:
        'O período atual não pode ser maior que 15 (prazo máximo para o curso de Engenharia).',
    })
    .optional()
    .or(z.literal('')),
  currentSemesterFilterOption: z.nativeEnum(NumberFilteringOption),
  cr: z.coerce
    .number()
    .min(0.1, {
      message: 'O IRA/CR deve ser maior que 0.1.',
    })
    .max(10, {
      message: 'Não faz sentido o IRA/CR ser maior que 10.',
    })
    .optional()
    .or(z.literal('')),
  crFilterOption: z.nativeEnum(NumberFilteringOption),
  studentGroups: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        group: z.string(),
        disable: z.boolean().optional(),
      }),
    )
    .optional(),
})

function FilterForm(props: {
  studentGroups: Array<number>
  setGlobalFilter: React.Dispatch<React.SetStateAction<object>>
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
  formData: FilterData
  setFormData: (value: FilterData) => void
  activeFilterCount: number
  setActiveFilterCount: React.Dispatch<React.SetStateAction<number>>
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.formData,
  })

  const errors = form.formState.errors

  const studentGroupOptions: Option[] = props.studentGroups.map((item) => {
    return {
      label: `Turma ${item}`,
      value: `turma ${item}`,
      group: item.toString(),
    }
  })

  function onSaveFilterForm(values: z.infer<typeof formSchema>) {
    props.setGlobalFilter(values)
    props.setShowDropdown(false)
    props.setFormData(values as FilterData)
  }

  function clearFilters() {
    props.setGlobalFilter({})
    props.setShowDropdown(false)
    props.setFormData(filterDefaults)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSaveFilterForm)}
        className="flex flex-col items-start gap-5"
      >
        <div className="w-full flex flex-col gap-1">
          <FormLabel>Curso</FormLabel>
          <div className="flex flex-row items-start space-x-5 space-y-0">
            <FormField
              control={form.control}
              name="csCheckbox"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center leading-0 space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Ciência da Computação</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ceCheckbox"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center leading-0 space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Engenharia de Computação</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <FormLabel
            className={errors.admissionSemester ? 'text-destructive' : ''}
          >
            Período de ingresso na UFAL
          </FormLabel>
          <div className="flex gap-2.5 w-full">
            <FormField
              control={form.control}
              name="admissionSemestreFilterOption"
              render={({ field }) => (
                <FormItem className="basis-2/5">
                  <FilterOptionSelect
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="admissionSemester"
              render={({ field }) => (
                <FormItem className="basis-3/5">
                  <FormControl>
                    <Input placeholder="2022.2" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {errors.admissionSemester && (
            <FormMessage>{errors.admissionSemester.message}</FormMessage>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <FormLabel
            className={errors.currentSemester ? 'text-destructive' : ''}
          >
            Período Atual
          </FormLabel>
          <div className="flex gap-2.5 w-full">
            <FormField
              control={form.control}
              name="currentSemesterFilterOption"
              render={({ field }) => (
                <FormItem className="basis-2/5">
                  <FilterOptionSelect
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentSemester"
              render={({ field }) => (
                <FormItem className="basis-3/5">
                  <FormControl>
                    <Input type="number" placeholder="5" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {errors.currentSemester && (
            <FormMessage>{errors.currentSemester.message}</FormMessage>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <FormLabel className={errors.cr ? 'text-destructive' : ''}>
            Índice de rendimento acadêmico (IRA/CR)
          </FormLabel>
          <div className="flex gap-2.5 w-full">
            <FormField
              control={form.control}
              name="crFilterOption"
              render={({ field }) => (
                <FormItem className="basis-2/5">
                  <FilterOptionSelect
                    onChange={field.onChange}
                    defaultValue={field.value}
                    disabled={true}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cr"
              render={({ field }) => (
                <FormItem className="basis-3/5">
                  <FormControl>
                    <Input
                      type="number"
                      lang="pt-br"
                      placeholder="8,5"
                      disabled={true}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {errors.cr && <FormMessage>{errors.cr.message}</FormMessage>}
        </div>
        <div className="w-full flex flex-col gap-1">
          <FormLabel>Turmas</FormLabel>
          <FormField
            control={form.control}
            name="studentGroups"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={studentGroupOptions}
                    placeholder="Selecione turmas..."
                    emptyIndicator={
                      <p className="text-center text-md leading-10 text-gray-600 dark:text-gray-400">
                        Essa turma não existe.
                      </p>
                    }
                    positionFixed={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row items-center justify-end w-full gap-2">
          <Button
            variant="outline"
            disabled={props.activeFilterCount === 0}
            onClick={clearFilters}
          >
            Limpar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}

function TableFiltersDropdown(props: {
  setGlobalFilter: React.Dispatch<React.SetStateAction<object>>
  studentGroups: Array<number>
}) {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false)

  // This is needed to persist the filter data when the dropdown is closed
  const [formData, _setFormData] = React.useState<FilterData>(filterDefaults)
  const [activeFilterCount, setActiveFilterCount] = React.useState<number>(0)

  function countActiveFilters(value: FilterData): number {
    let count: number = 0

    if (value.csCheckbox !== true) {
      count += 1
    }

    if (value.ceCheckbox !== true) {
      count += 1
    }

    if (value.admissionSemester !== '') {
      count += 1
    }

    if (value.currentSemester !== undefined && value.currentSemester !== '') {
      count += 1
    }

    if (value.cr !== undefined && value.cr !== '') {
      count += 1
    }

    if (value.studentGroups && value.studentGroups.length > 0) {
      count += 1
    }

    return count
  }

  function setFormData(value: FilterData) {
    setActiveFilterCount(countActiveFilters(value))
    _setFormData(value)
  }

  return (
    <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={activeFilterCount > 0 ? 'default' : 'outline'}
          onClick={() => setShowDropdown(true)}
        >
          <>
            <Filter size={'18px'} strokeWidth={2} />
            <span className="ml-2">Filtros</span>
          </>
          {activeFilterCount > 0 ? (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          ) : (
            ''
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-4 px-7 w-[560px]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left pb-6 pt-3">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Filtros
          </h2>
          <p className="text-sm text-muted-foreground">
            Adicione filtros limitar a visualização de alunos na lista.
          </p>
        </div>
        <FilterForm
          studentGroups={props.studentGroups}
          setGlobalFilter={props.setGlobalFilter}
          setShowDropdown={setShowDropdown}
          formData={formData}
          setFormData={setFormData}
          activeFilterCount={activeFilterCount}
          setActiveFilterCount={setActiveFilterCount}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { TableFiltersDropdown, tableGlobalFilterFn }
