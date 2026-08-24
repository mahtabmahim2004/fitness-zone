import React, { useEffect, useState } from "react";
import api from "../services/api";

import PackageTable from "../components/PackageTable";
import PackageModal from "../components/PackageModal";

import {
  successAlert,
  errorAlert,
  confirmAlert,
} from "../utils/alert";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedPackage, setSelectedPackage] =
    useState(null);

  useEffect(() => {
    loadPackages();
  }, []);

  // ==========================
  // Load Packages
  // ==========================
  const loadPackages = async () => {
    setLoading(true);

    try {
      const res = await api.get("/packages");
      setPackages(res.data);
    } catch (error) {
      console.log(error);

      errorAlert(
        "Load Failed",
        "Failed to load packages."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Add / Update Package
  // ==========================
  const handleSave = async (formData) => {
    try {
      if (selectedPackage) {
        await api.put(
          `/packages/${selectedPackage.package_id}`,
          formData
        );

        successAlert(
          "Updated!",
          "Package updated successfully."
        );
      } else {
        await api.post("/packages", formData);

        successAlert(
          "Added!",
          "Package added successfully."
        );
      }

      await loadPackages();

      setShowModal(false);
      setSelectedPackage(null);
    } catch (error) {
      console.log(error);

      errorAlert(
        "Save Failed",
        error.response?.data?.message ||
          "Failed to save package."
      );
    }
  };

  // ==========================
  // Edit Package
  // ==========================
  const handleEdit = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  // ==========================
  // Delete Package
  // ==========================
  const handleDelete = async (pkg) => {
    const result = await confirmAlert(
      "Delete Package?",
      `Delete ${pkg.package_name}?`
    );

    if (!result.isConfirmed) return;

    try {
      await api.delete(
        `/packages/${pkg.package_id}`
      );

      await loadPackages();

      successAlert(
        "Deleted!",
        "Package deleted successfully."
      );
    } catch (error) {
      console.log(error);

      errorAlert(
        "Delete Failed",
        error.response?.data?.message ||
          "Failed to delete package."
      );
    }
  };

  // ==========================
  // Search
  // ==========================
  const filteredPackages = packages.filter((pkg) =>
    pkg.package_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            📦 Packages Management
          </h2>

          <p className="text-muted mb-0">
            Total Packages :
            <strong> {filteredPackages.length}</strong>
          </p>
        </div>

        <button
          className="btn btn-warning px-4"
          onClick={() => {
            setSelectedPackage(null);
            setShowModal(true);
          }}
        >
          + Add Package
        </button>

      </div>

      {/* Card */}
      <div className="card shadow border-0">

        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

          <h5 className="mb-0">
            Packages List
          </h5>

          <button
            className="btn btn-light btn-sm"
            onClick={loadPackages}
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
                placeholder="🔍 Search package..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          <PackageTable
            packages={filteredPackages}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>

      </div>

      <PackageModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPackage(null);
        }}
        onSave={handleSave}
        selectedPackage={selectedPackage}
      />

    </div>
  );
}

export default Packages;