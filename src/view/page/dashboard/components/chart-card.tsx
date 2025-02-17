import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js"
import React from "react"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ChartCardProps {
    title: string
    value: string
    data: number[]
    color: string
}

const ChartCard: React.FC<ChartCardProps> = ({ title, value, data, color }) => {
    const chartData = {
        labels: Array.from({ length: data.length }, (_, i) => i + 1),
        datasets: [
            {
                data,
                borderColor: color,
                borderWidth: 4,
                tension: 0.4, // Smooth wavy line
                fill: false,
                pointRadius: 0, // Hides the points
                pointHoverRadius: 0, // Prevents points from appearing on hover
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
    }

    return (
        <div className="bg-white rounded-3xl border py-7">
            <div className="flex justify-between items-center px-6">
                <h3 className="text-xl font-bold"> {value}</h3>
                {/* <BsThreeDots size={21} /> */}
            </div>

            <div className="h-48 pt-3">
                <Line className="min-w-full" data={chartData} options={options} />
            </div>
            <div className="flex justify-between items-center py-6 px-6">
                <h3 className="text-xl font-bold ">{title}</h3>
                {/* <span className="text-md bg-green-100 px-2 py-1 rounded-full text-green-500">{percentage}</span> */}
            </div>
        </div>
    )
}

export default ChartCard
