import React, { useEffect, useState } from "react";
import api from "../services/api";

function RecentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentAttendance();
  }, []);

  const fetchRecentAttendance = async () => {
    try {
      const response = await api.get("/attendance/recent");
      setAttendance(response.data);
    } catch (error) {
      console.error("Error fetching recent attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="card border-0 shadow-lg"
        style={{ borderRadius: "18px" }}
      >
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            📅 Recent Attendance
          </h5>
        </div>

        <div className="card-body text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <h5 className="mt-3">
            Loading Attendance...
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card border-0 shadow-lg"
      style={{ borderRadius: "18px" }}
    >
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          📅 Recent Attendance
        </h5>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">

          <table className="table table-hover table-bordered mb-0 align-middle">

            <thead className="table-dark text-center">
              <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {attendance.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-5"
                  >
                    <h6 className="text-secondary">
                      No Recent Attendance Found
                    </h6>
                  </td>
                </tr>
              ) : (
                attendance.map((item) => (
                  <tr key={item.attendance_id}>

                    <td className="text-center">
                      <span className="badge bg-dark">
                        #{item.attendance_id}
                      </span>
                    </td>

                    <td>{item.member_name}</td>

                    <td className="text-center">
                      {item.check_in
                        ? new Date(
                            item.check_in
                          ).toLocaleString("en-GB")
                        : "-"}
                    </td>

                    <td className="text-center">
                      {item.check_out
                        ? new Date(
                            item.check_out
                          ).toLocaleString("en-GB")
                        : "--"}
                    </td>

                    <td className="text-center">
                      {item.status ===
                      "Checked In" ? (
                        <span className="badge bg-success px-3 py-2">
                          Checked In
                        </span>
                      ) : (
                        <span className="badge bg-danger px-3 py-2">
                          Checked Out
                        </span>
                      )}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default RecentAttendance;