import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";

import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Packages from "./pages/Packages";
import Payments from "./pages/Payments";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";

import ProtectedRoute from "./components/ProtectedRoute";

// Owner Profile Page
function Profile() {
  return (
    <div className="container mt-5">
      <h2>👤 Gym Owner Profile</h2>
      <p>Profile page is under development.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/fitness-zone"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Members */}
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />

        {/* Trainers */}
        <Route
          path="/trainers"
          element={
            <ProtectedRoute>
              <Trainers />
            </ProtectedRoute>
          }
        />

        {/* Packages */}
        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          }
        />

        {/* Payments */}
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

        {/* Attendance */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Redirect old dashboard URL */}
        <Route
          path="/dashboard"
          element={<Navigate to="/fitness-zone" replace />}
        />

        {/* Unknown Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;