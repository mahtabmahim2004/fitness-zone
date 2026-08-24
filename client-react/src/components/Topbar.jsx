import {
  FaBars,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import "./Topbar.css";

function Topbar() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">

      <div className="topbar-left">

        <button
          type="button"
          className="menu-btn"
          aria-label="Open Menu"
        >
          <FaBars />
        </button>

        <div>
          <h4 className="mb-0">
            Gym Management System
          </h4>

          <small className="text-muted">
            {today}
          </small>
        </div>

      </div>

      <div className="topbar-right">

        <button
          type="button"
          className="icon-btn position-relative"
          aria-label="Notifications"
        >
          <FaBell />

          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{
              fontSize: "10px",
            }}
          >
            3
          </span>
        </button>

        <div className="admin-info">

          <FaUserCircle className="admin-icon" />

          <div>

            <h6 className="mb-0">
              Admin
            </h6>

            <small className="text-muted">
              System Administrator
            </small>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;