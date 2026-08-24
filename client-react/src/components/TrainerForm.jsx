import React, { useState, useEffect } from "react";

function TrainerForm({
  onSave,
  selectedTrainer,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    trainer_name: "",
    phone: "",
    specialization: "",
    experience: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedTrainer) {
      setFormData({
        trainer_name: selectedTrainer.trainer_name || "",
        phone: selectedTrainer.phone || "",
        specialization:
          selectedTrainer.specialization || "",
        experience:
          selectedTrainer.experience || "",
        salary: selectedTrainer.salary || "",
      });
    } else {
      setFormData({
        trainer_name: "",
        phone: "",
        specialization: "",
        experience: "",
        salary: "",
      });
    }

    setErrors({});
  }, [selectedTrainer]);

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

    if (!formData.trainer_name.trim()) {
      newErrors.trainer_name =
        "Trainer name is required.";
    } else if (
      formData.trainer_name.trim().length < 3
    ) {
      newErrors.trainer_name =
        "Minimum 3 characters required.";
    }

    if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain exactly 11 digits.";
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization =
        "Specialization is required.";
    }

    const experience = Number(formData.experience);

    if (!experience && experience !== 0) {
      newErrors.experience =
        "Experience is required.";
    } else if (experience < 0 || experience > 50) {
      newErrors.experience =
        "Experience must be between 0 and 50 years.";
    }

    const salary = Number(formData.salary);

    if (!salary) {
      newErrors.salary = "Salary is required.";
    } else if (salary < 0) {
      newErrors.salary =
        "Salary cannot be negative.";
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

        {/* Trainer Name */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Trainer Name
          </label>

          <input
            type="text"
            name="trainer_name"
            className={`form-control shadow-sm ${
              errors.trainer_name
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter trainer name"
            value={formData.trainer_name}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.trainer_name}
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

        {/* Specialization */}
        <div className="col-md-6 mb-3">

          <label className="form-label fw-semibold">
            Specialization
          </label>

          <input
            type="text"
            name="specialization"
            className={`form-control shadow-sm ${
              errors.specialization
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter specialization"
            value={formData.specialization}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.specialization}
          </div>

        </div>

        {/* Experience */}
        <div className="col-md-3 mb-3">

          <label className="form-label fw-semibold">
            Experience
          </label>

          <input
            type="number"
            name="experience"
            className={`form-control shadow-sm ${
              errors.experience
                ? "is-invalid"
                : ""
            }`}
            placeholder="Years"
            value={formData.experience}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.experience}
          </div>

        </div>

        {/* Salary */}
        <div className="col-md-3 mb-3">

          <label className="form-label fw-semibold">
            Salary
          </label>

          <input
            type="number"
            name="salary"
            className={`form-control shadow-sm ${
              errors.salary ? "is-invalid" : ""
            }`}
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.salary}
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
          {selectedTrainer
            ? "Update Trainer"
            : "Save Trainer"}
        </button>

      </div>

    </form>
  );
}

export default TrainerForm;