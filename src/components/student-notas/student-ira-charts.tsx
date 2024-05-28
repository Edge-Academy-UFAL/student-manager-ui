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

const StudentIRACharts = ({
  iraList,
  gradesAverageList,
  haveNotas,
}: {
  iraList: Array<number>
  gradesAverageList: Array<number>
  haveNotas: boolean
}) => {
  const getLabels = (length: number) => {
    return Array.from({ length }, (v, k) => k + 1).map(
      (x) => x.toString() + 'º',
    )
  }

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

  const getChartOptions = (title: string, yLabel: string) => {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
        },
        labels: {
          color: chartColors.primary, // Color of legend labels
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Período',
          },
          grid: {
            color: chartColors.grid, // Color of the grid lines
          },
        },
        y: {
          title: {
            display: true,
            text: yLabel,
          },
          grid: {
            color: chartColors.grid, // Color of the grid lines
          },
          max: 10, // Set the maximum value for the y-axis
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
  }

  const dataIRA = {
    labels: getLabels(iraList.length),
    datasets: [
      {
        label: 'IRA do Aluno',
        data: iraList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const dataGradesAverage = {
    labels: getLabels(gradesAverageList.length),
    datasets: [
      {
        label: 'Média das Notas do Aluno',
        data: gradesAverageList,
        borderColor: 'rgb(53, 130, 255)',
        backgroundColor: 'rgba(53, 130, 255, 0.5)',
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
      <div className="flex justify-center items-center my-5 h-96 w-full">
        {haveNotas ? (
          <div className="flex flex-row flex-wrap h-full w-full gap-x-4 gap-y-4">
            <div className="flex-1 max-w-full border rounded-lg p-3">
              <Line
                options={getChartOptions('IRA do aluno por período', 'IRA')}
                data={dataIRA}
              />
            </div>
            <div className="flex-1 max-w-full border rounded-lg p-3">
              <Line
                options={getChartOptions(
                  'Média das notas do aluno por período',
                  'Média das Notas',
                )}
                data={dataGradesAverage}
              />
            </div>
          </div>
        ) : (
          <p className="italic">O aluno ainda não cadastrou nenhuma nota</p>
        )}
      </div>
    </div>
  )
}

export default StudentIRACharts
