import React from "react";
import PackageForm from "./PackageForm";

function PackageModal({
  show,
  onClose,
  onSave,
  selectedPackage,
}) {
  if (!show) return null;

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div
            className="modal-content border-0 shadow-lg"
            style={{
              borderRadius: "16px",
            }}
          >
            {/* Header */}
            <div className="modal-header bg-warning">
              <h4 className="modal-title fw-bold mb-0">
                {selectedPackage
                  ? "✏️ Edit Package"
                  : "➕ Add New Package"}
              </h4>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <PackageForm
                selectedPackage={selectedPackage}
                onSave={onSave}
                onCancel={onClose}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default PackageModal;