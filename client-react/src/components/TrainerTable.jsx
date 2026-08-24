import React from "react";
import {
  FaEdit,
  FaTrash,
  FaPhone,
  FaUserTie,
  FaMoneyBillWave,
  FaAward,
} from "react-icons/fa";

function TrainerTable({
  trainers = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-success"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h5 className="mt-3">
          Loading Trainers...
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
            <th>Trainer</th>
            <th>Phone</th>
            <th style={{ width: "180px" }}>
              Specialization
            </th>
            <th style={{ width: "140px" }}>
              Experience
            </th>
            <th style={{ width: "140px" }}>
              Salary
            </th>
            <th style={{ width: "150px" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {trainers.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center py-5"
              >
                <h5 className="text-secondary">
                  No Trainers Found
                </h5>

                <small className="text-muted">
                  Click "Add Trainer" to create a new trainer.
                </small>
              </td>
            </tr>
          ) : (
            trainers.map((trainer) => (
              <tr key={trainer.trainer_id}>

                <td className="text-center">
                  <span className="badge bg-success fs-6">
                    #{trainer.trainer_id}
                  </span>
                </td>

                <td>
                  <FaUserTie className="text-success me-2" />
                  <strong>
                    {trainer.trainer_name}
                  </strong>
                </td>

                <td>
                  <FaPhone className="text-primary me-2" />
                  {trainer.phone}
                </td>

                <td className="text-center">
                  <span className="badge bg-info text-dark px-3 py-2">
                    {trainer.specialization}
                  </span>
                </td>

                <td className="text-center">
                  <FaAward className="text-warning me-2" />
                  {trainer.experience} Years
                </td>

                <td className="text-center">
                  <span className="badge bg-success fs-6 px-3 py-2">
                    <FaMoneyBillWave className="me-1" />
                    ৳ {trainer.salary}
                  </span>
                </td>

                <td className="text-center">

                  <button
                    className="btn btn-warning btn-sm rounded-pill me-2"
                    onClick={() => onEdit(trainer)}
                    title="Edit Trainer"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => onDelete(trainer)}
                    title="Delete Trainer"
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

export default TrainerTable;