import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import API from "../services/api";
function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;
  const [admin, setAdmin] = useState(null);
  const [emergencyCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setAdmin(res.data.user);
      } catch (err) {
        console.error("Failed to load admin profile:", err);
      }
    };

    fetchAdminProfile();
  }, []);

  let pageInfo = {
    title: "Critical Alerts",
    subtitle: "Manage platform operations, requests, records, and reports.",
  };

  if (path === "/admin-dashboard") {
    pageInfo = {
      title: "Admin Dashboard",
      subtitle: "Monitor platform activity, users, and system overview.",
    };
  } else if (path === "/admin-users") {
    pageInfo = {
      title: "Users Management",
      subtitle: "Manage patients, doctors, NGOs, and administrator accounts.",
    };
  } else if (path === "/admin-join-requests") {
    pageInfo = {
      title: "Join Requests",
      subtitle: "Review doctor and NGO registration requests.",
    };
  } else if (path === "/admin-assistance") {
    pageInfo = {
      title: "Assistance Requests",
      subtitle: "Review and manage patient assistance requests.",
    };
  } else if (path === "/admin-logs") {
    pageInfo = {
      title: "Activity Logs",
      subtitle: "Track important system actions and user activity.",
    };
  } else if (path === "/admin-records") {
    pageInfo = {
      title: "Medical Records",
      subtitle: "Review patient records and system medical data.",
    };
  } else if (path === "/admin-reports") {
    pageInfo = {
      title: "Reports",
      subtitle: "Review platform statistics, requests, and performance data.",
    };
  } else if (path === "/admin-settings") {
    pageInfo = {
      title: "Settings",
      subtitle: "Manage system preferences and administrator settings.",
    };
  } else if (path === "/admin-appoint-doctor") {
    pageInfo = {
      title: "Assigned Doctor",
      subtitle: "Assign approved doctors to registered patients.",
    };
  }

  return (
    <div className="dashboard-page">
      <AdminSidebar />

      <main className="dashboard-main">
        <AdminTopbar
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          admin={admin}
        />

        {emergencyCount > 0 && (
          <div
            className="emergency-toast"
            onClick={() => navigate("/admin-emergency-alerts")}
          >
            <span className="material-symbols-outlined">emergency</span>
            <div>
              <strong>New Emergency Alert</strong>
              <p>{emergencyCount} active alerts. Click to view.</p>
            </div>
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
