import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function BP_chart({ chartData }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const { low, date, high } = chartData;

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this line to disable aspect ratio
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Blood Pressure",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: false,
      },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: date,
    datasets: [
      {
        label: "Low",
        data: low,
        borderColor: "rgb(252, 99, 255)",
        backgroundColor: "white",
        yAxisID: "y1",
      },
      {
        label: "High",
        data: high,
        borderColor: "rgb(99, 99, 255)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
