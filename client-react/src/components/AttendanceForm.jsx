import React, { useState } from "react";

function AttendanceForm({
  members = [],
  onSave,
  onCancel,
}) {
  const [memberId, setMemberId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!memberId) {
      alert("Please select a member.");
      return;
    }

    onSave({
      member_id: Number(memberId),
    });

    setMemberId("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="mb-4">

        <label className="form-label fw-semibold">
          Member
        </label>

        <select
          className="form-select shadow-sm"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          required
        >
          <option value="">
            Select Member
          </option>

          {members.length > 0 ? (
            members.map((member) => (
              <option
                key={member.id}
                value={member.id}
              >
                {member.full_name}
              </option>
            ))
          ) : (
            <option disabled>
              No Members Found
            </option>
          )}

        </select>

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
          Check In
        </button>

      </div>

    </form>
  );
}

export default AttendanceForm;