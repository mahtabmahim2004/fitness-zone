import React from "react";
import {
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaClock,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";

function PackageTable({
  packages = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-warning"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h5 className="mt-3">
          Loading Packages...
        </h5>
      </div>
    );
  }

  return (
    <div className="table-responsive">

      <table className="table table-hover table-bordered align-middle">

        <thead className="table-dark text-center">

          <tr>
            <th style={{ width: "80px" }}>ID</th>
            <th>Package</th>
            <th style={{ width: "150px" }}>
              Duration
            </th>
            <th style={{ width: "150px" }}>
              Price
            </th>
            <th>Description</th>
            <th style={{ width: "150px" }}>
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {packages.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-5"
              >
                <h5 className="text-secondary">
                  No Packages Found
                </h5>

                <small className="text-muted">
                  Click "Add Package" to create a new package.
                </small>
              </td>
            </tr>
          ) : (
            packages.map((pkg) => (
              <tr key={pkg.package_id}>

                <td className="text-center">
                  <span className="badge bg-warning text-dark fs-6">
                    #{pkg.package_id}
                  </span>
                </td>

                <td>
                  <FaBoxOpen className="text-warning me-2" />
                  <strong>{pkg.package_name}</strong>
                </td>

                <td className="text-center">
                  <FaClock className="text-primary me-2" />
                  {pkg.duration_months} Months
                </td>

                <td className="text-center">
                  <span className="badge bg-success fs-6 px-3 py-2">
                    <FaMoneyBillWave className="me-1" />
                    ৳{" "}
                    {Number(pkg.price).toLocaleString()}
                  </span>
                </td>

                <td>
                  <FaFileAlt className="text-secondary me-2" />

                  {pkg.description || (
                    <span className="text-muted">
                      No Description
                    </span>
                  )}
                </td>

                <td className="text-center">

                  <button
                    className="btn btn-warning btn-sm rounded-pill me-2"
                    onClick={() => onEdit(pkg)}
                    title="Edit Package"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => onDelete(pkg)}
                    title="Delete Package"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default PackageTable;