import React from "react";

function ConfirmDelete({
  show,
  member,
  onConfirm,
  onCancel,
}) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">
              Delete Member
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
            ></button>
          </div>

          <div className="modal-body">

            <h5>
              Are you sure you want to delete this member?
            </h5>

            <hr />

            <p>
              <strong>Name:</strong>{" "}
              {member?.full_name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {member?.phone}
            </p>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;