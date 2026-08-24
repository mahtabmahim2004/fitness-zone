import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaBoxOpen,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaChartBar,
  FaUserCircle,
  FaSignOutAlt,
  FaDumbbell,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/fitness-zone",
      icon: <FaHome />,
    },
    {
      name: "Members",
      path: "/members",
      icon: <FaUsers />,
    },
    {
      name: "Trainers",
      path: "/trainers",
      icon: <FaUserTie />,
    },
    {
      name: "Packages",
      path: "/packages",
      icon: <FaBoxOpen />,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <FaClipboardCheck />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Owner Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-header">
        <FaDumbbell className="logo-icon" />

        <div>
          <h3>Fitness Zone</h3>
          <small>Gym Owner Panel</small>
        </div>
      </div>

      <nav>
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <li
                key={item.path}
                className={active ? "active" : ""}
              >
                <Link
                  to={item.path}
                  title={item.name}
                  aria-current={active ? "page" : undefined}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;