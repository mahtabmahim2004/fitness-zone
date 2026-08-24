import React from "react";
import {
  FaEdit,
  FaTrash,
  FaMoneyBillWave,
  FaUser,
  FaBoxOpen,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";

function PaymentTable({
  payments = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-info"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h5 className="mt-3">
          Loading Payments...
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
            <th>Package</th>
            <th style={{ width: "140px" }}>Amount</th>
            <th style={{ width: "170px" }}>Method</th>
            <th style={{ width: "150px" }}>Date</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-5">
                <h5 className="text-secondary">
                  No Payments Found
                </h5>

                <small className="text-muted">
                  Click "Add Payment" to create a new payment.
                </small>
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.payment_id}>
                <td className="text-center">
                  <span className="badge bg-dark fs-6">
                    #{payment.payment_id}
                  </span>
                </td>

                <td>
                  <FaUser className="text-primary me-2" />
                  {payment.member_name}
                </td>

                <td>
                  <FaBoxOpen className="text-warning me-2" />
                  {payment.package_name}
                </td>

                <td className="text-center">
                  <span className="badge bg-success fs-6 px-3 py-2">
                    <FaMoneyBillWave className="me-1" />
                    ৳ {Number(payment.amount || 0).toLocaleString()}
                  </span>
                </td>

                <td>
                  <FaCreditCard className="text-info me-2" />
                  {payment.payment_method}
                </td>

                <td className="text-center">
                  <FaCalendarAlt className="text-secondary me-2" />
                  {payment.payment_date
                    ? payment.payment_date.substring(0, 10)
                    : "-"}
                </td>

                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm rounded-pill me-2"
                    onClick={() => onEdit(payment)}
                    title="Edit Payment"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => onDelete(payment)}
                    title="Delete Payment"
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

export default PaymentTable;