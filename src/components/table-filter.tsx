import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
    currentSemester: z.coerce.number().min(1).max(15).optional().or(z.literal("")),
    currentSemesterFilterOption: z.nativeEnum(NumberFilteringOption)
    

})

function FilterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            csCheckbox: true,
            ceCheckbox: true,
            admissionSemester: "",
            admissionSemestreFilterOption: NumberFilteringOption.GreaterThan,
            currentSemester: "",
            currentSemesterFilterOption: NumberFilteringOption.GreaterThan
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    function onTest() {
        // for (let value in NumberFilteringOption) {
            //     console.log(value);
            // }
        console.log(NumberFilteringOption)
        console.log(NumberFilteringOption.GreaterThan)
        const a = Object.values(NumberFilteringOption).map((value) => {
            return value
        })
        console.log(a)

    }

    const errors = form.formState.errors;
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
                <div>
                    <FormLabel>Índice de rendimento acadêmico (IRA/CR)</FormLabel>
                </div>
                <div>
                    <FormLabel>Turma</FormLabel>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form >
    )
}

function TableFiltersDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Filtros</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-4 px-7 w-[560px]">
                <FilterForm></FilterForm>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TableFiltersDropdown