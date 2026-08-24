import { useEffect, useState } from "react";
import api from "../services/api";

import AttendanceTable from "../components/AttendanceTable";
import AttendanceModal from "../components/AttendanceModal";

import {
  successAlert,
  errorAlert,
  confirmAlert,
} from "../utils/alert";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  // ==========================
  // Load Attendance
  // ==========================
  const loadAttendance = async () => {
    setLoading(true);

    try {
      const res = await api.get("/attendance");
      setAttendance(res.data);
    } catch (error) {
      console.error(error);

      errorAlert(
        "Load Failed",
        "Failed to load attendance."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Load Members
  // ==========================
  const loadMembers = async () => {
    try {
      const res = await api.get("/members");
      setMembers(res.data);
    } catch (error) {
      console.error(error);

      errorAlert(
        "Load Failed",
        "Failed to load members."
      );
    }
  };

  useEffect(() => {
    loadAttendance();
    loadMembers();
  }, []);

  // ==========================
  // Check In
  // ==========================
  const handleCheckIn = async (formData) => {
    try {
      await api.post("/attendance/checkin", formData);

      await loadAttendance();

      setShowModal(false);

      successAlert(
        "Attendance Marked!",
        "Member checked in successfully."
      );
    } catch (error) {
      console.error(error);

      errorAlert(
        "Check In Failed",
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to check in."
      );
    }
  };

  // ==========================
  // Check Out
  // ==========================
  const handleCheckOut = async (attendanceId) => {
    try {
      await api.put(`/attendance/checkout/${attendanceId}`);

      await loadAttendance();

      successAlert(
        "Check Out Successful!",
        "Member checked out successfully."
      );
    } catch (error) {
      console.error(error);

      errorAlert(
        "Check Out Failed",
        error.response?.data?.message ||
          "Failed to check out."
      );
    }
  };

  // ==========================
  // Delete Attendance
  // ==========================
  const handleDelete = async (item) => {
    const result = await confirmAlert(
      "Delete Attendance?",
      `Delete attendance of ${item.full_name}?`
    );

    if (!result.isConfirmed) return;

    try {
      await api.delete(
        `/attendance/${item.attendance_id}`
      );

      await loadAttendance();

      successAlert(
        "Deleted!",
        "Attendance deleted successfully."
      );
    } catch (error) {
      console.error(error);

      errorAlert(
        "Delete Failed",
        error.response?.data?.message ||
          "Failed to delete attendance."
      );
    }
  };

  // ==========================
  // Search
  // ==========================
  const filteredAttendance = attendance.filter((item) =>
    item.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            📅 Attendance Management
          </h2>

          <p className="text-muted mb-0">
            Total Records :
            <strong> {filteredAttendance.length}</strong>
          </p>
        </div>

        <button
          className="btn btn-primary px-4"
          onClick={() => setShowModal(true)}
        >
          + Check In
        </button>
      </div>

      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            Attendance List
          </h5>

          <button
            className="btn btn-light btn-sm"
            onClick={loadAttendance}
          >
            Refresh
          </button>
        </div>

        <div className="card-body">
          <div className="row mb-4">
            <div className="col-lg-4 col-md-6">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="🔍 Search Member..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          <AttendanceTable
            attendance={filteredAttendance}
            loading={loading}
            onCheckOut={handleCheckOut}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <AttendanceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleCheckIn}
        members={members}
      />
    </div>
  );
}

export default Attendance;