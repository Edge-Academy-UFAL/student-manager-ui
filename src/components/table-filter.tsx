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

enum NumberFilteringOption {
    GreaterThan,
    LessThan,
    EqualTo,
    GreaterOrEqualTo,
    LessOrEqualTo
}

const formSchema = z.object({
    csCheckbox: z.boolean().default(false).optional(),
    ceCheckbox: z.boolean().default(false).optional(),
    admissionSemester: z.string().regex(/\d\d\d\d.\d/i, {
        message: "O padrão para o período de ingresso é, por exemplo, \"2022.2\""
    }).trim(),
    admissionSemestreFilterOption: z.nativeEnum(NumberFilteringOption)

})

function FilterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            csCheckbox: true,
            ceCheckbox: true,
            admissionSemester: "",
            admissionSemestreFilterOption: NumberFilteringOption.GreaterThan
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    function onTest() {
        console.log(NumberFilteringOption)
        for (let value in NumberFilteringOption) {
            console.log(value);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start gap-3">
                <div>
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
                <div>
                    <FormLabel>Período de ingresso na UFAL</FormLabel>
                    <FormField
                        control={form.control}
                        name="admissionSemestreFilterOption"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(NumberFilteringOption)
                                            .filter(([name]) => isNaN(Number(name)))
                                            .map(([name, value]) => (
                                                <SelectItem key={value} value={value.toString()}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="admissionSemester"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="2022.2" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormLabel>Período Atual</FormLabel>
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
            <DropdownMenuContent className="py-4 px-7">
                <FilterForm></FilterForm>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TableFiltersDropdown