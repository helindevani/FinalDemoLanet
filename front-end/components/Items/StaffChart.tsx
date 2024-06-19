import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Import Chart.js datalabels plugin
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const StaffChartComponent = ({ data }: any) => {

  const chartData = {
    labels: ["Active", "Delivered", "Rating"],
    datasets: [
      {
        label: "",
        data: [
          data?.TotalActiveOrders ?? 0,
          data?.TotalDeliveredOrders ?? 0,
          data?.AverageRating ?? 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options :any = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#000000",
        font: {
          weight: "bold",
        },
       
      },
      tooltip: {
        callbacks: {
          label: function (context : any) {
            return context.dataset.label + ': ' + context.raw;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <h2 className="flex justify center text-xl font-semibold mb-4">Staff Summary</h2>
      <div
        className="chart-container p-4 relative h-auto w-full max-w-[600px] m-auto"
      >
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
};

export default StaffChartComponent;
