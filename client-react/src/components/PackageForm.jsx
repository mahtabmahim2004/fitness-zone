import React, { useState, useEffect } from "react";

function PackageForm({
  onSave,
  selectedPackage,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    package_name: "",
    duration_months: "",
    price: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedPackage) {
      setFormData({
        package_name: selectedPackage.package_name || "",
        duration_months:
          selectedPackage.duration_months || "",
        price: selectedPackage.price || "",
        description:
          selectedPackage.description || "",
      });
    } else {
      setFormData({
        package_name: "",
        duration_months: "",
        price: "",
        description: "",
      });
    }

    setErrors({});
  }, [selectedPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.package_name.trim()) {
      newErrors.package_name =
        "Package name is required.";
    } else if (
      formData.package_name.trim().length < 3
    ) {
      newErrors.package_name =
        "Minimum 3 characters required.";
    }

    const duration = Number(formData.duration_months);

    if (!duration) {
      newErrors.duration_months =
        "Duration is required.";
    } else if (duration < 1 || duration > 60) {
      newErrors.duration_months =
        "Duration must be between 1 and 60 months.";
    }

    const price = Number(formData.price);

    if (!price) {
      newErrors.price = "Price is required.";
    } else if (price <= 0) {
      newErrors.price =
        "Price must be greater than 0.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required.";
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

        {/* Package Name */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Package Name
          </label>

          <input
            type="text"
            name="package_name"
            className={`form-control shadow-sm ${
              errors.package_name ? "is-invalid" : ""
            }`}
            placeholder="Premium"
            value={formData.package_name}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.package_name}
          </div>

        </div>

        {/* Duration */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Duration (Months)
          </label>

          <input
            type="number"
            name="duration_months"
            className={`form-control shadow-sm ${
              errors.duration_months
                ? "is-invalid"
                : ""
            }`}
            placeholder="6"
            value={formData.duration_months}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.duration_months}
          </div>

        </div>

        {/* Price */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Price
          </label>

          <input
            type="number"
            name="price"
            className={`form-control shadow-sm ${
              errors.price ? "is-invalid" : ""
            }`}
            placeholder="4500"
            value={formData.price}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.price}
          </div>

        </div>

        {/* Description */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Description
          </label>

          <input
            type="text"
            name="description"
            className={`form-control shadow-sm ${
              errors.description
                ? "is-invalid"
                : ""
            }`}
            placeholder="Package Description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.description}
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
          {selectedPackage
            ? "Update Package"
            : "Save Package"}
        </button>

      </div>

    </form>
  );
}

export default PackageForm;