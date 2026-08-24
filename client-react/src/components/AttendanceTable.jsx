import React from "react";
import {
  FaTrash,
  FaSignOutAlt,
  FaUser,
  FaClock,
  FaCalendarCheck,
} from "react-icons/fa";

function AttendanceTable({
  attendance = [],
  loading = false,
  onCheckOut,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="text-center py-5">
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
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle">

        <thead className="table-dark text-center">
          <tr>
            <th style={{ width: "70px" }}>ID</th>
            <th>Member</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th style={{ width: "170px" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {attendance.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-5"
              >
                <h5 className="text-secondary">
                  No Attendance Records Found
                </h5>

                <small className="text-muted">
                  Click "Check In" to add a new
                  attendance record.
                </small>
              </td>
            </tr>
          ) : (
            attendance.map((item) => (
              <tr key={item.attendance_id}>

                <td className="text-center">
                  <span className="badge bg-primary fs-6">
                    #{item.attendance_id}
                  </span>
                </td>

                <td>
                  <FaUser className="text-primary me-2" />

                  <strong>{item.full_name}</strong>
                </td>

                <td>
                  <FaClock className="text-success me-2" />

                  {item.check_in ? (
                    <>
                      <div>
                        {new Date(
                          item.check_in
                        ).toLocaleDateString()}
                      </div>

                      <small className="text-muted">
                        {new Date(
                          item.check_in
                        ).toLocaleTimeString()}
                      </small>
                    </>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <FaCalendarCheck className="text-danger me-2" />

                  {item.check_out ? (
                    <>
                      <div>
                        {new Date(
                          item.check_out
                        ).toLocaleDateString()}
                      </div>

                      <small className="text-muted">
                        {new Date(
                          item.check_out
                        ).toLocaleTimeString()}
                      </small>
                    </>
                  ) : (
                    <span className="text-muted">
                      Not Yet
                    </span>
                  )}
                </td>

                <td className="text-center">

                  {item.check_out ? (
                    <span className="badge bg-success px-3 py-2">
                      Checked Out
                    </span>
                  ) : (
                    <span className="badge bg-warning text-dark px-3 py-2">
                      Inside Gym
                    </span>
                  )}

                </td>

                <td className="text-center">

                  <button
                    className="btn btn-primary btn-sm rounded-pill me-2"
                    disabled={item.check_out}
                    onClick={() =>
                      onCheckOut(item.attendance_id)
                    }
                    title="Check Out"
                  >
                    <FaSignOutAlt />
                  </button>

                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => onDelete(item)}
                    title="Delete Attendance"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}

export default AttendanceTable;