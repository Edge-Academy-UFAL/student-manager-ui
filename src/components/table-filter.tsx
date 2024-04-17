import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import MultipleSelector, { Option } from "@/components/ui/multiple-selector"

import {
    FilterOptionSelect,
    NumberFilteringOption
} from "@/components/custom-select"

const formSchema = z.object({
    csCheckbox: z.boolean().default(false).optional(),
    ceCheckbox: z.boolean().default(false).optional(),
    admissionSemester: z.string().regex(/\d\d\d\d.[12]/i, {
        message: "O período de ingresso tem padrão ano.semestre (e.g. 2022.2). Os valores do semestre só podem ser 1 ou 2."
    }).length(6, {
        message: "O período de ingresso tem apenas 6 caracteres."
    }).optional().or(z.literal('')),
    admissionSemestreFilterOption: z.nativeEnum(NumberFilteringOption),
    currentSemester: z.coerce.number().min(1, {
        message: "Período atual menor que 1 não faz sentido."
    }).max(15, {
        message: "O período atual não pode ser maior que 15 (prazo máximo para o curso de Engenharia)."
    }).optional().or(z.literal("")),
    currentSemesterFilterOption: z.nativeEnum(NumberFilteringOption),
    cr: z.coerce.number().min(0.1, {
        message: "O IRA/CR deve ser maior que 0.1."
    }).max(10, {
        message: "Não faz sentido o IRA/CR ser maior que 10."
    }).optional().or(z.literal("")),
    crFilterOption: z.nativeEnum(NumberFilteringOption),
    studentGroups: z.array(z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
    })).optional()
})

function FilterForm(props: {
    studentGroups: Array<number>
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            csCheckbox: true,
            ceCheckbox: true,
            admissionSemester: "",
            admissionSemestreFilterOption: NumberFilteringOption.GreaterThan,
            currentSemester: "",
            currentSemesterFilterOption: NumberFilteringOption.GreaterThan,
            cr: "",
            crFilterOption: NumberFilteringOption.GreaterThan,
            studentGroups: []
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const errors = form.formState.errors;

    const studentGroupOptions: Option[] = props.studentGroups.map((item) => {
        return { label: `Turma ${item}`, value: `turma ${item}` }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start gap-5">
                <div className="w-full flex flex-col gap-1">
                    <FormLabel>Curso</FormLabel>
                    <div className="flex flex-row items-start space-x-5 space-y-0">
                        <FormField
                            control={form.control}
                            name="csCheckbox"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center leading-0 space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>
                                        Ciência da Computação
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ceCheckbox"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center leading-0 space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>
                                        Engenharia de Computação
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <FormLabel className={errors.admissionSemester ? "text-destructive" : ""}>
                        Período de ingresso na UFAL
                    </FormLabel>
                    <div className="flex gap-2.5 w-full">
                        <FormField
                            control={form.control}
                            name="admissionSemestreFilterOption"
                            render={({ field }) => (
                                <FormItem className="basis-2/5">
                                    <FilterOptionSelect onChange={field.onChange} defaultValue={field.value}/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="admissionSemester"
                            render={({ field }) => (
                                <FormItem className="basis-3/5">
                                    <FormControl>
                                        <Input placeholder="2022.2" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    {errors.admissionSemester && <FormMessage>{errors.admissionSemester.message}</FormMessage>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <FormLabel className={errors.currentSemester ? "text-destructive" : ""}>
                        Período Atual
                    </FormLabel>
                    <div className="flex gap-2.5 w-full">
                        <FormField
                            control={form.control}
                            name="currentSemesterFilterOption"
                            render={({ field }) => (
                                <FormItem className="basis-2/5">
                                    <FilterOptionSelect onChange={field.onChange} defaultValue={field.value}/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentSemester"
                            render={({ field }) => (
                                <FormItem className="basis-3/5">
                                    <FormControl>
                                        <Input type="number" placeholder="5" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    {errors.currentSemester && <FormMessage>{errors.currentSemester.message}</FormMessage>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <FormLabel className={errors.cr ? "text-destructive" : ""}>
                        Índice de rendimento acadêmico (IRA/CR)
                    </FormLabel>
                    <div className="flex gap-2.5 w-full">
                        <FormField
                            control={form.control}
                            name="crFilterOption"
                            render={({ field }) => (
                                <FormItem className="basis-2/5">
                                    <FilterOptionSelect onChange={field.onChange} defaultValue={field.value}/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cr"
                            render={({ field }) => (
                                <FormItem className="basis-3/5">
                                    <FormControl>
                                        <Input type="number" lang="pt-br" placeholder="8,5" {...field}/>
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
                                        positionFixed={true}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="ms-auto">Salvar</Button>
            </form>
        </Form >
    )
}

function TableFiltersDropdown() {

    const studentGroups = [1, 2, 3, 4, 5];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Filtros</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-4 px-7 w-[560px]">
                <div className="flex flex-col space-y-1.5 text-center sm:text-left pb-6 pt-3">
                    <h2 className="text-lg font-semibold leading-none tracking-tight">Filtros</h2>
                    <p className="text-sm text-muted-foreground">
                        Adicione filtros limitar a visualização de alunos na lista.
                    </p>
                </div>
                <FilterForm studentGroups={studentGroups}></FilterForm>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TableFiltersDropdown