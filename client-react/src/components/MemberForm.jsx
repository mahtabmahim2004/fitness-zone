import React, { useState, useEffect } from "react";

function MemberForm({
  onSave,
  selectedMember,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    age: "",
    gender: "",
    membership_type: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedMember) {
      setFormData({
        full_name: selectedMember.full_name || "",
        phone: selectedMember.phone || "",
        age: selectedMember.age || "",
        gender: selectedMember.gender || "",
        membership_type:
          selectedMember.membership_type || "",
      });
    } else {
      setFormData({
        full_name: "",
        phone: "",
        age: "",
        gender: "",
        membership_type: "",
      });
    }

    setErrors({});
  }, [selectedMember]);

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
    let newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required.";
    } else if (formData.full_name.trim().length < 3) {
      newErrors.full_name =
        "Minimum 3 characters required.";
    }

    if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain exactly 11 digits.";
    }

    const age = Number(formData.age);

    if (!age) {
      newErrors.age = "Age is required.";
    } else if (age < 15 || age > 80) {
      newErrors.age =
        "Age must be between 15 and 80.";
    }

    if (!formData.gender) {
      newErrors.gender = "Select gender.";
    }

    if (!formData.membership_type) {
      newErrors.membership_type =
        "Select membership.";
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

        {/* Name */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Full Name
          </label>

          <input
            type="text"
            name="full_name"
            className={`form-control shadow-sm ${
              errors.full_name ? "is-invalid" : ""
            }`}
            placeholder="Enter full name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.full_name}
          </div>

        </div>

        {/* Phone */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            className={`form-control shadow-sm ${
              errors.phone ? "is-invalid" : ""
            }`}
            placeholder="01XXXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.phone}
          </div>

        </div>

        {/* Age */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Age
          </label>

          <input
            type="number"
            name="age"
            className={`form-control shadow-sm ${
              errors.age ? "is-invalid" : ""
            }`}
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.age}
          </div>

        </div>

        {/* Gender */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Gender
          </label>

          <select
            name="gender"
            className={`form-select shadow-sm ${
              errors.gender ? "is-invalid" : ""
            }`}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <div className="invalid-feedback">
            {errors.gender}
          </div>

        </div>

        {/* Membership */}
        <div className="col-12 mb-4">

          <label className="form-label fw-semibold">
            Membership Package
          </label>

          <select
            name="membership_type"
            className={`form-select shadow-sm ${
              errors.membership_type
                ? "is-invalid"
                : ""
            }`}
            value={formData.membership_type}
            onChange={handleChange}
          >
            <option value="">Select Package</option>
            <option value="Basic">
              Basic
            </option>
            <option value="Standard">
              Standard
            </option>
            <option value="Premium">
              Premium
            </option>
          </select>

          <div className="invalid-feedback">
            {errors.membership_type}
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
          {selectedMember
            ? "Update Member"
            : "Save Member"}
        </button>

      </div>

    </form>
  );
}

export default MemberForm;