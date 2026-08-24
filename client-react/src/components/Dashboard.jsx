import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import DashboardChart from "./DashboardChart";
import RecentPayments from "./RecentPayments";
import RecentAttendance from "./RecentAttendance";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalMembers: 0,
    totalTrainers: 0,
    totalPackages: 0,
    totalRevenue: 0,
    todayAttendance: 0,
    activeMembers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h4 className="mt-3">
          Loading Dashboard...
        </h4>
      </div>
    );
  }

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <div className="dashboard-content">

          {/* Dashboard Header */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "18px",
            }}
          >
            <div className="card-body">

              <h2 className="fw-bold mb-2">
                📊 Gym Management Dashboard
              </h2>

              <p className="text-muted mb-0">
                Welcome Back Admin 👋

                <br />

                Manage members, trainers, payments,
                attendance and reports from one place.
              </p>

            </div>
          </div>

          {/* Quick Navigation */}

          <div className="card border-0 shadow mb-4">

            <div className="card-header bg-primary text-white">

              <h5 className="mb-0">
                🚀 Quick Navigation
              </h5>

            </div>

            <div className="card-body">

              <div className="row g-3">

                <div className="col-lg-2 col-md-4 col-6">

                  <button
                    className="btn btn-primary w-100 py-3"
                    onClick={() => navigate("/members")}
                  >
                    👥
                    <br />
                    Members
                  </button>

                </div>

                <div className="col-lg-2 col-md-4 col-6">

                  <button
                    className="btn btn-success w-100 py-3"
                    onClick={() => navigate("/trainers")}
                  >
                    🏋️
                    <br />
                    Trainers
                  </button>

                </div>

                <div className="col-lg-2 col-md-4 col-6">

                  <button
                    className="btn btn-warning w-100 py-3"
                    onClick={() => navigate("/packages")}
                  >
                    📦
                    <br />
                    Packages
                  </button>

                </div>

                <div className="col-lg-2 col-md-4 col-6">

                  <button
                    className="btn btn-info text-white w-100 py-3"
                    onClick={() => navigate("/payments")}
                  >
                    💳
                    <br />
                    Payments
                  </button>

                </div>

                <div className="col-lg-2 col-md-4 col-6">

                  <button
                    className="btn btn-secondary w-100 py-3"
                    onClick={() => navigate("/attendance")}
                  >
                    📅
                    <br />
                    Attendance
                  </button>

                </div>

                <div className="col-lg-2 col-md-4 col-6">

                  <button
                    className="btn btn-dark w-100 py-3"
                    onClick={() => navigate("/reports")}
                  >
                    📊
                    <br />
                    Reports
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Statistics Cards */}
          {/* Statistics Cards */}

<div className="row">

  {/* Total Members */}
  <div className="col-xl-4 col-md-6 mb-4">
    <div
      className="card border-0 shadow-lg text-white h-100"
      style={{
        background:
          "linear-gradient(135deg,#4e73df,#224abe)",
        borderRadius: "18px",
      }}
    >
      <div className="card-body">
        <h6 className="text-uppercase fw-bold">
          👥 Total Members
        </h6>

        <h2 className="fw-bold mt-3">
          {dashboard.totalMembers}
        </h2>

        <small>
          Registered gym members
        </small>
      </div>
    </div>
  </div>

  {/* Trainers */}
  <div className="col-xl-4 col-md-6 mb-4">
    <div
      className="card border-0 shadow-lg text-white h-100"
      style={{
        background:
          "linear-gradient(135deg,#1cc88a,#13855c)",
        borderRadius: "18px",
      }}
    >
      <div className="card-body">
        <h6 className="text-uppercase fw-bold">
          🏋️ Total Trainers
        </h6>

        <h2 className="fw-bold mt-3">
          {dashboard.totalTrainers}
        </h2>

        <small>
          Available trainers
        </small>
      </div>
    </div>
  </div>

  {/* Packages */}
  <div className="col-xl-4 col-md-6 mb-4">
    <div
      className="card border-0 shadow-lg h-100"
      style={{
        background:
          "linear-gradient(135deg,#f6c23e,#dda20a)",
        borderRadius: "18px",
      }}
    >
      <div className="card-body text-dark">
        <h6 className="text-uppercase fw-bold">
          📦 Packages
        </h6>

        <h2 className="fw-bold mt-3">
          {dashboard.totalPackages}
        </h2>

        <small>
          Membership packages
        </small>
      </div>
    </div>
  </div>

  {/* Revenue */}
  <div className="col-xl-4 col-md-6 mb-4">
    <div
      className="card border-0 shadow-lg text-white h-100"
      style={{
        background:
          "linear-gradient(135deg,#e74a3b,#be2617)",
        borderRadius: "18px",
      }}
    >
      <div className="card-body">
        <h6 className="text-uppercase fw-bold">
          💰 Total Revenue
        </h6>

        <h2 className="fw-bold mt-3">
          ৳{" "}
          {Number(
            dashboard.totalRevenue || 0
          ).toLocaleString()}
        </h2>

        <small>
          Total income
        </small>
      </div>
    </div>
  </div>

  {/* Attendance */}
  <div className="col-xl-4 col-md-6 mb-4">
    <div
      className="card border-0 shadow-lg text-white h-100"
      style={{
        background:
          "linear-gradient(135deg,#36b9cc,#258391)",
        borderRadius: "18px",
      }}
    >
      <div className="card-body">
        <h6 className="text-uppercase fw-bold">
          📅 Today's Attendance
        </h6>

        <h2 className="fw-bold mt-3">
          {dashboard.todayAttendance}
        </h2>

        <small>
          Checked in today
        </small>
      </div>
    </div>
  </div>

  {/* Active Members */}
  <div className="col-xl-4 col-md-6 mb-4">
    <div
      className="card border-0 shadow-lg text-white h-100"
      style={{
        background:
          "linear-gradient(135deg,#5a5c69,#2d2f38)",
        borderRadius: "18px",
      }}
    >
      <div className="card-body">
        <h6 className="text-uppercase fw-bold">
          ⭐ Active Members
        </h6>

        <h2 className="fw-bold mt-3">
          {dashboard.activeMembers}
        </h2>

        <small>
          Currently active members
        </small>
      </div>
    </div>
  </div>

</div>

{/* Charts */}
{/* Charts */}

<div className="row">

  {/* Dashboard Chart */}
  <div className="col-lg-8 mb-4">

    <div
      className="card border-0 shadow-lg h-100"
      style={{
        borderRadius: "18px",
      }}
    >
      <div className="card-header bg-white border-0 pt-4 px-4">
        <h5 className="fw-bold mb-0">
          📈 Gym Statistics
        </h5>

        <small className="text-muted">
          Members, Trainers, Revenue &
          Attendance Overview
        </small>
      </div>

      <div className="card-body">
        <DashboardChart dashboard={dashboard} />
      </div>

    </div>

  </div>

  {/* Quick Summary */}
  <div className="col-lg-4 mb-4">

    <div
      className="card border-0 shadow-lg h-100"
      style={{
        borderRadius: "18px",
      }}
    >

      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">
          ⚡ Quick Summary
        </h5>
      </div>

      <div className="card-body">

        <div className="mb-3">
          <strong>Total Members</strong>

          <div className="progress mt-2">
            <div
              className="progress-bar bg-primary"
              style={{ width: "100%" }}
            >
              {dashboard.totalMembers}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <strong>Today's Attendance</strong>

          <div className="progress mt-2">
            <div
              className="progress-bar bg-info"
              style={{
                width:
                  dashboard.totalMembers > 0
                    ? `${
                        (dashboard.todayAttendance /
                          dashboard.totalMembers) *
                        100
                      }%`
                    : "0%",
              }}
            >
              {dashboard.todayAttendance}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <strong>Revenue</strong>

          <h4 className="text-success mt-2">
            ৳{" "}
            {Number(
              dashboard.totalRevenue || 0
            ).toLocaleString()}
          </h4>
        </div>

        <div>
          <strong>Packages</strong>

          <h4 className="text-warning mt-2">
            {dashboard.totalPackages}
          </h4>
        </div>

      </div>

    </div>

  </div>

</div>

{/* Recent Activities */}

<div className="row">

  {/* Recent Payments */}

  <div className="col-lg-6 mb-4">

    <div
      className="card border-0 shadow-lg h-100"
      style={{
        borderRadius: "18px",
      }}
    >

      <div className="card-header bg-info text-white">
        <h5 className="mb-0">
          💳 Recent Payments
        </h5>
      </div>

      <div className="card-body">

        <RecentPayments />

      </div>

    </div>

  </div>

  {/* Recent Attendance */}

  <div className="col-lg-6 mb-4">

    <div
      className="card border-0 shadow-lg h-100"
      style={{
        borderRadius: "18px",
      }}
    >

      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          📅 Recent Attendance
        </h5>
      </div>

      <div className="card-body">

        <RecentAttendance />

      </div>

    </div>

  </div>

</div>

{/* Dashboard Summary */}
{/* Dashboard Summary */}

<div
  className="card border-0 shadow-lg mt-4 mb-5"
  style={{
    borderRadius: "18px",
  }}
>

  <div className="card-header bg-dark text-white">
    <h5 className="mb-0">
      📋 Dashboard Summary
    </h5>
  </div>

  <div className="card-body">

    <div className="row">

      <div className="col-md-6">

        <table className="table table-bordered table-hover align-middle">

          <tbody>

            <tr>
              <th style={{ width: "60%" }}>
                👥 Total Members
              </th>

              <td>
                {dashboard.totalMembers}
              </td>
            </tr>

            <tr>
              <th>
                🏋️ Total Trainers
              </th>

              <td>
                {dashboard.totalTrainers}
              </td>
            </tr>

            <tr>
              <th>
                📦 Total Packages
              </th>

              <td>
                {dashboard.totalPackages}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      <div className="col-md-6">

        <table className="table table-bordered table-hover align-middle">

          <tbody>

            <tr>
              <th style={{ width: "60%" }}>
                💰 Total Revenue
              </th>

              <td>
                ৳{" "}
                {Number(
                  dashboard.totalRevenue || 0
                ).toLocaleString()}
              </td>
            </tr>

            <tr>
              <th>
                📅 Today's Attendance
              </th>

              <td>
                {dashboard.todayAttendance}
              </td>
            </tr>

            <tr>
              <th>
                ⭐ Active Members
              </th>

              <td>
                {dashboard.activeMembers}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>

{/* Footer */}

<div className="text-center text-muted mb-4">

  <small>
    © {new Date().getFullYear()} Gym Management System |
    Developed with ❤️ using React & Express.js
  </small>

</div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;