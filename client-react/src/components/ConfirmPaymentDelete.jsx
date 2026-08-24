import React from "react";

function ConfirmPaymentDelete({
  show,
  selectedPayment,
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
              Delete Payment
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
            ></button>
          </div>

          <div className="modal-body">

            <h5>
              Are you sure you want to delete this payment?
            </h5>

            <hr />

            <p>
              <strong>Payment ID:</strong>{" "}
              {selectedPayment?.payment_id}
            </p>

            <p>
              <strong>Member:</strong>{" "}
              {selectedPayment?.member_name}
            </p>

            <p>
              <strong>Package:</strong>{" "}
              {selectedPayment?.package_name}
            </p>

            <p>
              <strong>Amount:</strong>{" "}
              ৳{selectedPayment?.amount}
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

export default ConfirmPaymentDelete;