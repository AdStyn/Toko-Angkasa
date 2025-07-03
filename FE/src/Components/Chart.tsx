import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const salesData: Record<string, number[]> = {
  2023: [70, 65, 75, 85, 60, 45, 30, 85, 90, 50, 20, 35],
  2024: [80, 70, 90, 100, 70, 50, 40, 90, 95, 60, 30, 40],
  2025: [90, 85, 100, 95, 85, 60, 55, 100, 110, 70, 45, 50],
  2026: [90, 85, 100, 95, 85, 60, 55, 100, 140, 70, 45, 50],
};

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const GrafikPenjualan: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: `Penjualan ${selectedYear}`,
        data: salesData[selectedYear],
        backgroundColor: "#4D81F1",
        borderRadius: 6,
        barThickness: "flex" as const,
        maxBarThickness: 36,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h2 className="text-sm sm:text-2xl font-semibold text-gray-800">
            Grafik Penjualan
          </h2>
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="mt-3 sm:mt-0 border rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(salesData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="h-60 sm:h-72 md:h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default GrafikPenjualan;
