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

const ChartComponent = ({ data }: any) => {
  const scaleRevenue = (num: number): number => {
    return num >= 1000 ? num / 1000 : num;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const chartData = {
    labels: ["Cylinders", "Suppliers", "Bookings", "Revenue"],
    datasets: [
      {
        label: "",
        data: [
          data?.TotalCylinder ?? 0,
          data?.TotalSupplier ?? 0,
          data?.TotalBooking ?? 0,
          scaleRevenue(data?.TotalRevenue ?? 0),
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
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
        formatter: function (value : any, context : any) {
          if (context.dataIndex === 3) {
            return formatNumber(data?.TotalRevenue ?? 0);
          }
          return value;
        },
      },
      tooltip: {
        callbacks: {
          label: function (context : any) {
            if (context.dataIndex === 3) {
              return 'Revenue: ' + formatNumber(data?.TotalRevenue ?? 0);
            }
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
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div
        className="chart-container p-4 relative h-auto w-full max-w-[600px] m-auto"
      >
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
};

export default ChartComponent;
