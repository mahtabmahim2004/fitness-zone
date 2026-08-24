import React, { useEffect, useState } from "react";
import api from "../services/api";

import MemberTable from "../components/MemberTable";
import MemberModal from "../components/MemberModal";

import {
  successAlert,
  errorAlert,
  confirmAlert,
} from "../utils/alert";

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    loadMembers();
  }, []);

  // ==========================
  // Load Members
  // ==========================
  const loadMembers = async () => {
    setLoading(true);

    try {
      const res = await api.get("/members");
      setMembers(res.data);
    } catch (error) {
      console.log(error);

      errorAlert(
        "Load Failed",
        "Failed to load members."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Add / Update Member
  // ==========================
  const handleSave = async (formData) => {
    try {
      if (selectedMember) {
        await api.put(
          `/members/${selectedMember.id}`,
          formData
        );

        successAlert(
          "Updated!",
          "Member updated successfully."
        );
      } else {
        await api.post("/members", formData);

        successAlert(
          "Added!",
          "Member added successfully."
        );
      }

      await loadMembers();

      setShowModal(false);
      setSelectedMember(null);
    } catch (error) {
      console.log(error);

      errorAlert(
        "Save Failed",
        error.response?.data?.message ||
          "Failed to save member."
      );
    }
  };

  // ==========================
  // Edit Member
  // ==========================
  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  // ==========================
  // Delete Member
  // ==========================
  const handleDelete = async (member) => {
    const result = await confirmAlert(
      "Delete Member?",
      `Delete ${member.full_name}?`
    );

    if (!result.isConfirmed) return;

    try {
      await api.delete(
        `/members/${member.id}`
      );

      await loadMembers();

      successAlert(
        "Deleted!",
        "Member deleted successfully."
      );
    } catch (error) {
      console.log(error);

      errorAlert(
        "Delete Failed",
        error.response?.data?.message ||
          "Failed to delete member."
      );
    }
  };

  // ==========================
  // Search Filter
  // ==========================
  const filteredMembers = members.filter((member) =>
    member.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            👥 Members Management
          </h2>

          <p className="text-muted mb-0">
            Total Members :
            <strong> {filteredMembers.length}</strong>
          </p>
        </div>

        <button
          className="btn btn-primary px-4"
          onClick={() => {
            setSelectedMember(null);
            setShowModal(true);
          }}
        >
          + Add Member
        </button>

      </div>

      {/* Card */}

      <div className="card shadow border-0">

        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

          <h5 className="mb-0">
            Members List
          </h5>

          <button
            className="btn btn-light btn-sm"
            onClick={loadMembers}
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
                placeholder="🔍 Search member..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          <MemberTable
            members={filteredMembers}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>

      </div>

      <MemberModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedMember(null);
        }}
        onSave={handleSave}
        selectedMember={selectedMember}
      />

    </div>
  );
}

export default Members;