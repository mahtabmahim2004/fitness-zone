import React from "react";

function Reports() {
  const reports = [
    {
      title: "Members",
      pdf: "http://localhost:5000/reports/members",
      excel: "http://localhost:5000/reports/members/excel",
    },
    {
      title: "Payments",
      pdf: "http://localhost:5000/reports/payments",
      excel: "http://localhost:5000/reports/payments/excel",
    },
    {
      title: "Attendance",
      pdf: "http://localhost:5000/reports/attendance",
      excel: "http://localhost:5000/reports/attendance/excel",
    },
    {
      title: "Dashboard",
      pdf: "http://localhost:5000/reports/dashboard",
      excel: "http://localhost:5000/reports/dashboard/excel",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold">📊 Reports Center</h2>
        <p className="text-muted">
          Download all system reports in PDF or Excel format.
        </p>
      </div>

      <div className="row">
        {reports.map((report, index) => (
          <div className="col-lg-6 mb-4" key={index}>
            <div className="card shadow border-0 h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">📄 {report.title} Report</h5>
              </div>

              <div className="card-body text-center">
                <p className="text-muted">
                  Download the {report.title} report in your preferred format.
                </p>

                <div className="d-grid gap-3">
                  <a
                    href={report.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-danger"
                  >
                    📄 Download PDF
                  </a>

                  <a
                    href={report.excel}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-success"
                  >
                    📊 Download Excel
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <a href="/dashboard" className="btn btn-dark">
          ⬅ Back to Dashboard
        </a>
      </div>
    </div>
  );
}

export default Reports;