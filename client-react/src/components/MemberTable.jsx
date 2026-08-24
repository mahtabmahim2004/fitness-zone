import React from "react";
import {
  FaEdit,
  FaTrash,
  FaPhone,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

function MemberTable({
  members = [],
  loading = false,
  onEdit,
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
          Loading Members...
        </h5>
      </div>
    );
  }

  return (
    <div className="table-responsive">

      <table className="table table-hover table-bordered align-middle">

        <thead className="table-dark text-center">

          <tr>
            <th style={{ width: "80px" }}>ID</th>
            <th>Member</th>
            <th>Phone</th>
            <th style={{ width: "80px" }}>Age</th>
            <th style={{ width: "120px" }}>Gender</th>
            <th style={{ width: "150px" }}>Membership</th>
            <th style={{ width: "150px" }}>Join Date</th>
            <th style={{ width: "150px" }}>
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {members.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                className="text-center py-5"
              >
                <h5 className="text-secondary">
                  No Members Found
                </h5>

                <small className="text-muted">
                  Click "Add Member" to create a new member.
                </small>
              </td>
            </tr>
          ) : (
            members.map((member) => (
              <tr key={member.id}>

                <td className="text-center">
                  <span className="badge bg-primary fs-6">
                    #{member.id}
                  </span>
                </td>

                <td>
                  <FaUser className="text-primary me-2" />
                  <strong>{member.full_name}</strong>
                </td>

                <td>
                  <FaPhone className="text-success me-2" />
                  {member.phone}
                </td>

                <td className="text-center">
                  {member.age}
                </td>

                <td className="text-center">
                  <span
                    className={`badge ${
                      member.gender === "Male"
                        ? "bg-primary"
                        : "bg-danger"
                    }`}
                  >
                    {member.gender}
                  </span>
                </td>

                <td className="text-center">
                  <span className="badge bg-success px-3 py-2">
                    {member.membership_type}
                  </span>
                </td>

                <td className="text-center">
                  <FaCalendarAlt className="text-secondary me-2" />

                  {member.join_date
                    ? new Date(
                        member.join_date
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="text-center">

                  <button
                    className="btn btn-warning btn-sm rounded-pill me-2"
                    onClick={() => onEdit(member)}
                    title="Edit Member"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => onDelete(member)}
                    title="Delete Member"
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

export default MemberTable;