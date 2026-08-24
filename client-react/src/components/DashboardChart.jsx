import React from "react";
import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function DashboardChart({ dashboard }) {
  const barData = {
    labels: [
      "Members",
      "Trainers",
      "Packages",
      "Attendance",
      "Active",
    ],

    datasets: [
      {
        label: "Gym Statistics",

        data: [
          dashboard.totalMembers,
          dashboard.totalTrainers,
          dashboard.totalPackages,
          dashboard.todayAttendance,
          dashboard.activeMembers,
        ],

        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#f6c23e",
          "#36b9cc",
          "#5a5c69",
        ],

        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: [
      "Revenue",
      "Members",
      "Attendance",
      "Active Members",
    ],

    datasets: [
      {
        data: [
          dashboard.totalRevenue,
          dashboard.totalMembers,
          dashboard.todayAttendance,
          dashboard.activeMembers,
        ],

        backgroundColor: [
          "#e74a3b",
          "#4e73df",
          "#36b9cc",
          "#1cc88a",
        ],

        hoverOffset: 15,
      },
    ],
  };

  const barOptions = {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
      duration: 1200,
    },

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Gym Statistics",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
      duration: 1200,
    },

    plugins: {
      legend: {
        position: "bottom",
      },

      title: {
        display: true,
        text: "Dashboard Overview",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="row">

      {/* Bar Chart */}

      <div className="col-lg-8 mb-4">

        <div
          className="card border-0 shadow-lg h-100"
          style={{
            borderRadius: "18px",
          }}
        >

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">
              📊 Statistics Chart
            </h5>

          </div>

          <div
            className="card-body"
            style={{
              height: "420px",
            }}
          >

            <Bar
              data={barData}
              options={barOptions}
            />

          </div>

        </div>

      </div>

      {/* Pie Chart */}

      <div className="col-lg-4 mb-4">

        <div
          className="card border-0 shadow-lg h-100"
          style={{
            borderRadius: "18px",
          }}
        >

          <div className="card-header bg-success text-white">

            <h5 className="mb-0">
              🥧 Dashboard Overview
            </h5>

          </div>

          <div
            className="card-body"
            style={{
              height: "420px",
            }}
          >

            <Pie
              data={pieData}
              options={pieOptions}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardChart;