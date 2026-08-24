import React, { useEffect, useState } from "react";
import api from "../services/api";

function RecentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPayments();
  }, []);

  const fetchRecentPayments = async () => {
    try {
      const response = await api.get("/payments/recent");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching recent payments:", error);
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
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">
            💳 Recent Payments
          </h5>
        </div>

        <div className="card-body text-center py-5">
          <div
            className="spinner-border text-success"
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
      </div>
    );
  }

  return (
    <div
      className="card border-0 shadow-lg"
      style={{ borderRadius: "18px" }}
    >
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          💳 Recent Payments
        </h5>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">

          <table className="table table-hover table-bordered mb-0 align-middle">

            <thead className="table-dark text-center">
              <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Package</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-5"
                  >
                    <h6 className="text-secondary">
                      No Recent Payments Found
                    </h6>
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.payment_id}>

                    <td className="text-center">
                      <span className="badge bg-dark">
                        #{payment.payment_id}
                      </span>
                    </td>

                    <td>{payment.member_name}</td>

                    <td>{payment.package_name}</td>

                    <td className="text-center">
                      <span className="badge bg-success fs-6">
                        ৳{" "}
                        {Number(
                          payment.amount || 0
                        ).toLocaleString()}
                      </span>
                    </td>

                    <td>
                      {payment.payment_method}
                    </td>

                    <td className="text-center">
                      {payment.payment_date
                        ? new Date(
                            payment.payment_date
                          ).toLocaleDateString(
                            "en-GB"
                          )
                        : "-"}
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

export default RecentPayments;