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

function MonthSelect() {

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Mês" />
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

function YearSelect(props: { startingYears: number }) {
    const currentYear = new Date().getFullYear()
    const years = Array.from(
        new Array(currentYear - props.startingYears + 1),
        (_, index) => (currentYear - props.startingYears) - index + props.startingYears
    )

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Ano" />
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

export { MonthSelect, YearSelect }