import React, { useEffect, useState } from "react";
import api from "../services/api";

import PaymentTable from "../components/PaymentTable";
import PaymentModal from "../components/PaymentModal";

import {
  successAlert,
  errorAlert,
  confirmAlert,
} from "../utils/alert";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [packages, setPackages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    loadPayments();
    loadMembers();
    loadPackages();
  }, []);

  // ==========================
  // Load Payments
  // ==========================
  const loadPayments = async () => {
    setLoading(true);

    try {
      const res = await api.get("/payments");
      setPayments(res.data);
    } catch (error) {
      console.log(error);

      errorAlert(
        "Load Failed",
        "Failed to load payments."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    try {
      const res = await api.get("/members");
      setMembers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPackages = async () => {
    try {
      const res = await api.get("/packages");
      setPackages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Add / Update Payment
  // ==========================
  const handleSave = async (formData) => {
    try {
      if (selectedPayment) {
        await api.put(
          `/payments/${selectedPayment.payment_id}`,
          formData
        );

        successAlert(
          "Updated!",
          "Payment updated successfully."
        );
      } else {
        await api.post("/payments", formData);

        successAlert(
          "Added!",
          "Payment added successfully."
        );
      }

      await loadPayments();

      setShowModal(false);
      setSelectedPayment(null);
    } catch (error) {
      console.log(error);

      errorAlert(
        "Save Failed",
        error.response?.data?.message ||
          "Failed to save payment."
      );
    }
  };

  // ==========================
  // Edit Payment
  // ==========================
  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  // ==========================
  // Delete Payment
  // ==========================
  const handleDelete = async (payment) => {
    const result = await confirmAlert(
      "Delete Payment?",
      `Delete payment for ${payment.member_name}?`
    );

    if (!result.isConfirmed) return;

    try {
      await api.delete(
        `/payments/${payment.payment_id}`
      );

      await loadPayments();

      successAlert(
        "Deleted!",
        "Payment deleted successfully."
      );
    } catch (error) {
      console.log(error);

      errorAlert(
        "Delete Failed",
        error.response?.data?.message ||
          "Failed to delete payment."
      );
    }
  };

  // ==========================
  // Search
  // ==========================
  const filteredPayments = payments.filter((payment) =>
    payment.member_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            💳 Payments Management
          </h2>

          <p className="text-muted mb-0">
            Total Payments :
            <strong> {filteredPayments.length}</strong>
          </p>
        </div>

        <button
          className="btn btn-info text-white px-4"
          onClick={() => {
            setSelectedPayment(null);
            setShowModal(true);
          }}
        >
          + Add Payment
        </button>

      </div>

      {/* Card */}
      <div className="card shadow border-0">

        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

          <h5 className="mb-0">
            Payments List
          </h5>

          <button
            className="btn btn-light btn-sm"
            onClick={loadPayments}
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

          <PaymentTable
            payments={filteredPayments}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>

      </div>

      <PaymentModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPayment(null);
        }}
        onSave={handleSave}
        selectedPayment={selectedPayment}
        members={members}
        packages={packages}
      />

    </div>
  );
}

export default Payments;