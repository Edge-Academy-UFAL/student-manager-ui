'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { FormControl } from "./ui/form";

function MonthSelect(props: { onChange: (value: string) => void, error: boolean, value: string }) {

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


    let inputColor = props.error ? 'border-red-500' : '';

    return (
        <Select onValueChange={props.onChange}>
            <SelectTrigger className={`${inputColor}`}>
                <SelectValue placeholder={props.value ? props.value : "Mês"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        months.map((month, index) => {
                            return <SelectItem key={index} value={month}>{month}</SelectItem>
                        })
                    }
                </SelectGroup>

            </SelectContent>
        </Select>
    )
}

function YearSelect(props: { startingYears: number, onChange: (value: string) => void, error: boolean, value: string }) {
    const currentYear = new Date().getFullYear()
    const years = Array.from(
        new Array(currentYear - props.startingYears + 1),
        (_, index) => (currentYear - props.startingYears) - index + props.startingYears
    )

    let inputColor = props.error ? 'border-red-500' : '';

    return (
        <Select onValueChange={props.onChange}>
            <SelectTrigger className={`${inputColor}`}>
                <SelectValue placeholder={props.value ? props.value : "Ano"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        years.map((year, index) => {
                            return <SelectItem key={index} value={year.toString()}>{year}</SelectItem>
                        })
                    }
                </SelectGroup>

            </SelectContent>
        </Select>
    )
}

enum NumberFilteringOption {
    GreaterThan = "Maior que",
    LessThan = "Menor que",
    EqualTo = "Igual a",
    GreaterOrEqualTo = "Maior ou igual a",
    LessOrEqualTo = "Menor ou igual a"
}

function FilterOptionSelect(props: {
    onChange: (...event: any[]) => void,
    defaultValue?: string
}) {
    return (
        <Select onValueChange={props.onChange} defaultValue={props.defaultValue}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {
                    Object.values(NumberFilteringOption)
                        .map((value) => {
                            return (
                                <SelectItem key={value} value={value}>
                                    {value}
                                </SelectItem>
                            )
                        })
                }
            </SelectContent>
        </Select>
    )
}

export { MonthSelect, YearSelect, FilterOptionSelect, NumberFilteringOption }