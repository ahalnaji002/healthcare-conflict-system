import { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";

function AdminJoinRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPendingRegistrations = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "http://localhost:5000/api/admin/pending-registrations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch pending registrations");
          return;
        }

        setRequests(data.requests || []);
      } catch (err) {
        console.error("FETCH PENDING REGISTRATIONS ERROR:", err);
        setError("Server connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRegistrations();
  }, [token]);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        request.name?.toLowerCase().includes(searchValue) ||
        request.email?.toLowerCase().includes(searchValue) ||
        request.phone?.toLowerCase().includes(searchValue) ||
        request.specialty?.toLowerCase().includes(searchValue) ||
        request.organization_type?.toLowerCase().includes(searchValue) ||
        request.license_number?.toLowerCase().includes(searchValue);

      const matchesType =
        typeFilter === "All Types" ||
        (typeFilter === "Doctors" && request.request_type === "doctor") ||
        (typeFilter === "NGOs" && request.request_type === "ngo");

      return matchesSearch && matchesType;
    });
  }, [requests, searchTerm, typeFilter]);

  const formatSubmittedDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);

    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getInitial = (name) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box orange">
          <div>
            <p>Pending Requests</p>
            <h2>{requests.length}</h2>
          </div>
          <span className="material-symbols-outlined">pending_actions</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Doctors</p>
            <h2>
              {requests.filter((r) => r.request_type === "doctor").length}
            </h2>
          </div>
          <span className="material-symbols-outlined">medical_services</span>
        </div>

        <div className="stat-box blue">
          <div>
            <p>NGOs</p>
            <h2>{requests.filter((r) => r.request_type === "ngo").length}</h2>
          </div>
          <span className="material-symbols-outlined">volunteer_activism</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Displayed</p>
            <h2>{filteredRequests.length}</h2>
          </div>
          <span className="material-symbols-outlined">filter_alt</span>
        </div>
      </section>

      <section className="join-review-layout">
        <div className="content-left">
          <div className="panel">
            <div className="panel-header admin-users-toolbar">
              <div>
                <h2>Pending Verification Requests</h2>
                <p>Review submitted information and uploaded documents.</p>
              </div>

              <div className="table-actions">
                <div className="search-box">
                  <span className="material-symbols-outlined">search</span>
                  <input
                    type="text"
                    placeholder="Search applicants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="filter-select"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Doctors</option>
                  <option>NGOs</option>
                </select>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}
            {loading && <p>Loading pending registrations...</p>}

            {!loading && !error && filteredRequests.length === 0 && (
              <p>No pending registration requests found.</p>
            )}

            <div className="join-request-list">
              {!loading &&
                !error &&
                filteredRequests.map((request) => (
                  <div
                    className="join-request-card"
                    key={request.join_request_id}
                  >
                    <div className="join-request-main">
                      <div className="patient-avatar">
                        {getInitial(request.name)}
                      </div>

                      <div>
                        <h3>{request.name}</h3>
                        <p>
                          {request.request_type === "doctor"
                            ? "Doctor Registration"
                            : "NGO Registration"}{" "}
                          • {request.email}
                        </p>

                        <div className="profile-badges">
                          <span
                            className={`role-pill ${
                              request.request_type === "doctor"
                                ? "doctor-role"
                                : "ngo-role"
                            }`}
                          >
                            {request.request_type === "doctor"
                              ? "Doctor"
                              : "NGO"}
                          </span>
                          <span className="status pending">Pending</span>
                        </div>
                      </div>
                    </div>

                    <div className="join-request-details">
                      <div>
                        <p>
                          {request.request_type === "doctor"
                            ? "License Number"
                            : "Registration Number"}
                        </p>
                        <h4>{request.license_number || "N/A"}</h4>
                      </div>

                      <div>
                        <p>
                          {request.request_type === "doctor"
                            ? "Specialty"
                            : "Organization"}
                        </p>
                        <h4>
                          {request.request_type === "doctor"
                            ? request.specialty || "N/A"
                            : request.organization_type || "N/A"}
                        </h4>
                      </div>

                      <div>
                        <p>Submitted</p>
                        <h4>{formatSubmittedDate(request.created_at)}</h4>
                      </div>
                    </div>

                    <div className="join-request-actions">
                      <button className="mini-btn">Approve</button>
                      <button className="secondary-plan-btn">
                        Request Docs
                      </button>
                      <button className="icon-mini-btn danger-icon-btn">
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel progress-panel">
            <h2>Verification Progress</h2>

            <div className="progress-circle">
              <span>{requests.length}</span>{" "}
            </div>

            <p>
              Pending registration requests are waiting for admin review and
              verification.
            </p>
          </div>

          <div className="panel">
            <h2>Review Checklist</h2>

            <div className="checklist-list">
              <label className="checklist-item">
                <input type="checkbox" defaultChecked />
                <span>Check identity information</span>
              </label>

              <label className="checklist-item">
                <input type="checkbox" defaultChecked />
                <span>Review professional license</span>
              </label>

              <label className="checklist-item">
                <input type="checkbox" />
                <span>Validate organization documents</span>
              </label>

              <label className="checklist-item">
                <input type="checkbox" />
                <span>Confirm service area and role permissions</span>
              </label>
            </div>
          </div>

          <div className="panel">
            <h2>Verification Notes</h2>

            <div className="reminder-note">
              <h3>Admin Review Required</h3>
              <p>
                Doctor and NGO accounts should not be activated before verifying
                license, documents, and contact information.
              </p>
            </div>

            <button className="message-btn">
              <span className="material-symbols-outlined">download</span>
              Export Pending List
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminJoinRequests;
