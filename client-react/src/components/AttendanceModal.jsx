import React from "react";
import AttendanceForm from "./AttendanceForm";

function AttendanceModal({
  show,
  onClose,
  onSave,
  members = [],
}) {
  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(3px)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div
            className="modal-content border-0 shadow-lg"
            style={{ borderRadius: "15px" }}
          >
            <div className="modal-header bg-primary text-white">
              <h4 className="modal-title fw-bold">
                📅 Member Check In
              </h4>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body p-4">
              <AttendanceForm
                members={members}
                onSave={onSave}
                onCancel={onClose}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default AttendanceModal;