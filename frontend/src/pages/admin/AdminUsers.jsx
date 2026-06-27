import { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch users");
          return;
        }

        setUsers(data.users || []);
      } catch (err) {
        console.error("FETCH USERS ERROR:", err);
        setError("Server connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        user.full_name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue) ||
        user.role?.toLowerCase().includes(searchValue) ||
        user.status?.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "All Roles" ||
        (roleFilter === "Patients" && user.role === "patient") ||
        (roleFilter === "Doctors" && user.role === "doctor") ||
        (roleFilter === "NGOs" && user.role === "ngo") ||
        (roleFilter === "Admins" && user.role === "admin");

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const getInitial = (name) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  const getRoleClass = (role) => {
    if (role === "patient") return "patient-role";
    if (role === "doctor") return "doctor-role";
    if (role === "ngo") return "ngo-role";
    return "admin-role";
  };

  const formatRole = (role) => {
    if (!role) return "N/A";
    return role.toUpperCase() === "NGO"
      ? "NGO"
      : role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getStatusClass = (status) => {
    if (status === "active") return "taken";
    if (status === "pending") return "pending";
    return "cancelled";
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(
      `http://localhost:5000/api/admin/users/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update user");
      return;
    }

    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </div>
          <span className="material-symbols-outlined">groups</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Active Accounts</p>
            <h2>{users.filter((u) => u.status === "active").length}</h2>
          </div>
          <span className="material-symbols-outlined">verified</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Pending Review</p>
            <h2>{users.filter((u) => u.status === "pending").length}</h2>
          </div>
          <span className="material-symbols-outlined">pending_actions</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Suspended</p>
            <h2>{users.filter((u) => u.status === "inactive").length}</h2>
          </div>
          <span className="material-symbols-outlined">block</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header admin-users-toolbar">
          <div>
            <h2>System Users</h2>
            <p>Search, filter, activate, suspend, or update user roles.</p>
          </div>

          <div className="table-actions">
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option>All Roles</option>
              <option>Patients</option>
              <option>Doctors</option>
              <option>NGOs</option>
              <option>Admins</option>
            </select>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading users...</p>}

        <div className="admin-users-table">
          <div className="admin-users-row admin-users-head">
            <span>User</span>
            <span>Role</span>
            <span>Email</span>
            <span>Status</span>
            <span>Verified</span>
            <span>Actions</span>
          </div>

          {!loading && filteredUsers.length === 0 && (
            <div className="admin-users-row">
              <span>No users found.</span>
            </div>
          )}

          {!loading &&
            filteredUsers.map((user) => (
              <div className="admin-users-row" key={user.id}>
                <div className="patient-cell">
                  <div className="patient-avatar">
                    {getInitial(user.full_name)}
                  </div>

                  <div>
                    <h3>{user.full_name}</h3>
                    <p>USR-{user.id}</p>
                  </div>
                </div>

                <span className={`role-pill ${getRoleClass(user.role)}`}>
                  {formatRole(user.role)}
                </span>

                <span>{user.email}</span>

                <span className={`status ${getStatusClass(user.status)}`}>
                  {user.status
                    ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
                    : "N/A"}
                </span>

                <span>{user.is_verified ? "Yes" : "No"}</span>

                <div className="row-actions">
                  <button className="mini-btn">Edit</button>

                  <button className="icon-mini-btn">
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button>

                  <button
                    type="button"
                    className={
                      user.status === "active"
                        ? "icon-mini-btn danger-icon-btn"
                        : "icon-mini-btn activate-icon-btn"
                    }
                    onClick={() =>
                      updateStatus(
                        user.id,
                        user.status === "active" ? "inactive" : "active",
                      )
                    }
                    title={
                      user.status === "active"
                        ? "Suspend user"
                        : "Activate user"
                    }
                  >
                    <span className="material-symbols-outlined">
                      {user.status === "active" ? "block" : "check_circle"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default AdminUsers;
