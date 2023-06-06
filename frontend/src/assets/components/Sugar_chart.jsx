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

export default function Sugar_chart({ chartData }) {
  const { after, before, date } = chartData;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // Modify the date array to cut the strings to the first 10 characters

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
        text: "Glucose Breakfast",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          display: false, // Set display to false to remove y-axis lines and margins
        },
      },
    },
  };

  const data = {
    labels: date, // Use the modified date array
    datasets: [
      {
        label: "Before",
        data: after,
        borderColor: "purple",
        backgroundColor: "white",
        yAxisID: "y",
      },
      {
        label: "After",
        data: before,
        borderColor: "teal",
        backgroundColor: "white",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
