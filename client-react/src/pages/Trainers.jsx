import React, { useEffect, useState } from "react";
import api from "../services/api";

import TrainerTable from "../components/TrainerTable";
import TrainerModal from "../components/TrainerModal";

import {
  successAlert,
  errorAlert,
  confirmAlert,
} from "../utils/alert";

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedTrainer, setSelectedTrainer] =
    useState(null);

  useEffect(() => {
    loadTrainers();
  }, []);

  // ==========================
  // Load Trainers
  // ==========================
  const loadTrainers = async () => {
    setLoading(true);

    try {
      const res = await api.get("/trainers");
      setTrainers(res.data);
    } catch (error) {
      console.log(error);

      errorAlert(
        "Load Failed",
        "Failed to load trainers."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Add / Update Trainer
  // ==========================
  const handleSave = async (formData) => {
    try {
      if (selectedTrainer) {
        await api.put(
          `/trainers/${selectedTrainer.trainer_id}`,
          formData
        );

        successAlert(
          "Updated!",
          "Trainer updated successfully."
        );
      } else {
        await api.post("/trainers", formData);

        successAlert(
          "Added!",
          "Trainer added successfully."
        );
      }

      await loadTrainers();

      setShowModal(false);
      setSelectedTrainer(null);
    } catch (error) {
      console.log(error);

      errorAlert(
        "Save Failed",
        error.response?.data?.message ||
          "Failed to save trainer."
      );
    }
  };

  // ==========================
  // Edit Trainer
  // ==========================
  const handleEdit = (trainer) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
  };

  // ==========================
  // Delete Trainer
  // ==========================
  const handleDelete = async (trainer) => {
    const result = await confirmAlert(
      "Delete Trainer?",
      `Delete ${trainer.trainer_name}?`
    );

    if (!result.isConfirmed) return;

    try {
      await api.delete(
        `/trainers/${trainer.trainer_id}`
      );

      await loadTrainers();

      successAlert(
        "Deleted!",
        "Trainer deleted successfully."
      );
    } catch (error) {
      console.log(error);

      errorAlert(
        "Delete Failed",
        error.response?.data?.message ||
          "Failed to delete trainer."
      );
    }
  };

  // ==========================
  // Search
  // ==========================
  const filteredTrainers = trainers.filter((trainer) =>
    trainer.trainer_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            🏋️ Trainers Management
          </h2>

          <p className="text-muted mb-0">
            Total Trainers :
            <strong> {filteredTrainers.length}</strong>
          </p>
        </div>

        <button
          className="btn btn-success px-4"
          onClick={() => {
            setSelectedTrainer(null);
            setShowModal(true);
          }}
        >
          + Add Trainer
        </button>

      </div>

      {/* Card */}
      <div className="card shadow border-0">

        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

          <h5 className="mb-0">
            Trainers List
          </h5>

          <button
            className="btn btn-light btn-sm"
            onClick={loadTrainers}
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
                placeholder="🔍 Search trainer..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          <TrainerTable
            trainers={filteredTrainers}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>

      </div>

      <TrainerModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTrainer(null);
        }}
        onSave={handleSave}
        selectedTrainer={selectedTrainer}
      />

    </div>
  );
}

export default Trainers;