import React, { useEffect, useState } from "react";

function PaymentForm({
  onSave,
  selectedPayment,
  onCancel,
  members = [],
  packages = [],
}) {
  const [formData, setFormData] = useState({
    member_id: "",
    package_id: "",
    amount: "",
    payment_method: "",
  });

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedPayment) {
      setFormData({
        member_id: selectedPayment.member_id || "",
        package_id: selectedPayment.package_id || "",
        amount: selectedPayment.amount || "",
        payment_method: selectedPayment.payment_method || "",
      });

      const pkg = packages.find(
        (p) => p.package_id === selectedPayment.package_id
      );

      setSelectedPackage(pkg || null);
    } else {
      setFormData({
        member_id: "",
        package_id: "",
        amount: "",
        payment_method: "",
      });

      setSelectedPackage(null);
    }

    setErrors({});
  }, [selectedPayment, packages]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "package_id") {
      const pkg = packages.find(
        (p) => p.package_id === Number(value)
      );

      setSelectedPackage(pkg || null);

      setFormData((prev) => ({
        ...prev,
        package_id: value,
        amount: pkg ? pkg.price : "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.member_id) {
      newErrors.member_id = "Please select a member.";
    }

    if (!formData.package_id) {
      newErrors.package_id = "Please select a package.";
    }

    if (!formData.payment_method) {
      newErrors.payment_method =
        "Please select a payment method.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="row">

        {/* Member */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Member
          </label>

          <select
            name="member_id"
            className={`form-select shadow-sm ${
              errors.member_id ? "is-invalid" : ""
            }`}
            value={formData.member_id}
            onChange={handleChange}
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option
                key={member.member_id}
                value={member.member_id}
              >
                {member.full_name}
              </option>
            ))}
          </select>

          <div className="invalid-feedback">
            {errors.member_id}
          </div>

        </div>

        {/* Package */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Package
          </label>

          <select
            name="package_id"
            className={`form-select shadow-sm ${
              errors.package_id ? "is-invalid" : ""
            }`}
            value={formData.package_id}
            onChange={handleChange}
          >
            <option value="">Select Package</option>

            {packages.map((pkg) => (
              <option
                key={pkg.package_id}
                value={pkg.package_id}
              >
                {pkg.package_name} - ৳
                {Number(pkg.price).toLocaleString()}
              </option>
            ))}
          </select>

          <div className="invalid-feedback">
            {errors.package_id}
          </div>

        </div>

      </div>

      {/* Package Information */}
      {selectedPackage && (
        <div className="card border-info shadow-sm mb-4">

          <div className="card-header bg-info text-white fw-bold">
            Package Information
          </div>

          <div className="card-body">

            <div className="row">

              <div className="col-md-6">

                <p>
                  <strong>Name:</strong>{" "}
                  {selectedPackage.package_name}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {selectedPackage.duration_months} Months
                </p>

              </div>

              <div className="col-md-6">

                <p>
                  <strong>Price:</strong> ৳
                  {Number(
                    selectedPackage.price || 0
                  ).toLocaleString()}
                </p>

                <p className="mb-0">
                  <strong>Description:</strong>{" "}
                  {selectedPackage.description ||
                    "N/A"}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      <div className="row">

        {/* Amount */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Amount
          </label>

          <input
            type="number"
            className="form-control shadow-sm bg-light"
            value={formData.amount}
            readOnly
          />

        </div>

        {/* Payment Method */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Payment Method
          </label>

          <select
            name="payment_method"
            className={`form-select shadow-sm ${
              errors.payment_method
                ? "is-invalid"
                : ""
            }`}
            value={formData.payment_method}
            onChange={handleChange}
          >
            <option value="">
              Select Method
            </option>

            <option value="Cash">
              Cash
            </option>

            <option value="Bkash">
              Bkash
            </option>

            <option value="Nagad">
              Nagad
            </option>

            <option value="Card">
              Card
            </option>

          </select>

          <div className="invalid-feedback">
            {errors.payment_method}
          </div>

        </div>

      </div>

      <hr />

      <div className="d-flex justify-content-end gap-2">

        <button
          type="button"
          className="btn btn-outline-secondary px-4"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-success px-4"
        >
          {selectedPayment
            ? "Update Payment"
            : "Save Payment"}
        </button>

      </div>

    </form>
  );
}

export default PaymentForm;