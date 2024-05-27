'use client'

import React, { useEffect, useState } from 'react'
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
import { useTheme } from 'next-themes'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const StudentIRACharts = ({ iraList }: { iraList: Array<number> }) => {
  const labels = Array.from({ length: iraList.length }, (v, k) => k + 1).map(
    (x) => x.toString() + 'o Período',
  )

  const theme = useTheme().resolvedTheme

  const [chartColors, setChartColors] = useState({
    primary: 'rgba(15, 12, 26, 1)',
    grid: 'rgba(255, 255, 255, 0.1)',
  })

  useEffect(() => {
    const darkModeColors = {
      primary: 'rgba(15, 12, 26, 1)', // Dark mode primary color
      grid: 'rgba(255, 255, 255, 0.1)', // Dark mode grid color
    }

    const lightModeColors = {
      primary: 'rgba(255, 99, 132, 1)', // Light mode primary color
      grid: 'rgba(15, 12, 26, 0.1)', // Light mode grid color
    }

    setChartColors(theme === 'dark' ? darkModeColors : lightModeColors)
  }, [theme])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'IRA do aluno por período',
      },
      labels: {
        color: chartColors.primary, // Color of legend labels
      },
    },
    scales: {
      x: {
        grid: {
          color: chartColors.grid, // Color of the grid lines
        },
      },
      y: {
        grid: {
          color: chartColors.grid, // Color of the grid lines
        },
      },
    },
    elements: {
      point: {
        backgroundColor: chartColors.primary, // Color of the data points
        borderColor: chartColors.primary, // Border color of the data points
      },
    },
    maintainAspectRatio: false, // Allow the chart to stretch to fill the container
  }

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
      <div className="flex justify-center items-center h-96 w-full">
        {iraList[0] ? (<Line options={options} data={data} />) : (<p className='italic'>O aluno ainda não cadastrou nenhuma nota</p>)}
      </div>
    </div>
  )
}

export default StudentIRACharts
