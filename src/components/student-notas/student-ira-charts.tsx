'use client'

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'IRA do aluno por período',
    },
  },
}

const StudentIRACharts = ({ iraList }: { iraList: Array<number> }) => {
  const labels = Array.from({ length: iraList.length }, (v, k) => k + 1).map(
    (x) => x.toString() + 'o Período',
  )

  const data = {
    labels,
    datasets: [
      {
        label: 'IRA do Aluno',
        data: iraList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div className="max-w-[90vw] w-full px-10 py-5 justify-center flex flex-col">
      <div className="flex justify-start">
        <h1 className="text-2xl font-bold">
          Histórico do Rendimento Acadêmico
        </h1>
      </div>
      <div className="flex justify-center h-96 w-full">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default StudentIRACharts
