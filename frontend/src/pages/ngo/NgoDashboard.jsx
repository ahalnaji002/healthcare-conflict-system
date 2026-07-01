import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";

function NgoDashboard() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const [ngo, setNgo] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await API.get("/requests/ngo/my-tasks");
      const activeRequests = (res.data || []).filter((request) =>
        ["approved", "in_progress"].includes(request.status),
      );

      setRequests(activeRequests);
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchRequests();

      try {
        const res = await API.get("/requests/ngo/profile");
        setNgo(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  const updateRequestStatus = async (id, status) => {
    try {
      setMessage("");

      await API.put(`/requests/ngo/update-status/${id}`, { status });

      setMessageType("success");
      setMessage(`Request status updated to ${status}`);

      setRequests((prev) => {
        if (status === "completed") {
          return prev.filter((request) => request.assistance_request_id !== id);
        }

        return prev.map((request) =>
          request.assistance_request_id === id
            ? { ...request, status }
            : request,
        );
      });
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || "Failed to update request");
    }
  };

  const criticalCount = requests.filter(
    (r) => r.urgency_level === "critical" || r.urgency_level === "high",
  ).length;

  const inProgressCount = requests.filter(
    (r) => r.status === "in_progress",
  ).length;

  const approvedCount = requests.filter((r) => r.status === "approved").length;

  const completedCount = requests.filter(
    (r) => r.status === "completed",
  ).length;

  const getInitial = (name) => {
    if (!name) return "P";
    return name.trim().charAt(0).toUpperCase();
  };

  const getPriorityClass = (priority) => {
    if (priority === "critical" || priority === "high") return "critical";
    if (priority === "medium") return "medium";
    return "low";
  };

  const getStatusClass = (status) => {
    if (status === "completed" || status === "approved") return "taken";
    if (status === "rejected") return "cancelled";
    return "pending";
  };

  const formatText = (value) => {
    if (!value) return "N/A";
    return value.replace("_", " ");
  };

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box red">
          <div>
            <p>Critical Requests</p>
            <h2>{criticalCount}</h2>
          </div>
          <span className="material-symbols-outlined">priority_high</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>In Progress Requests</p>
            <h2>{inProgressCount}</h2>
          </div>
          <span className="material-symbols-outlined">hourglass_top</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Approved Support</p>
            <h2>{approvedCount}</h2>
          </div>
          <span className="material-symbols-outlined">check_circle</span>
        </div>

        <div className="stat-box blue">
          <div>
            <p>Completed Support</p>
            <h2>{completedCount}</h2>
          </div>
          <span className="material-symbols-outlined">inventory_2</span>
        </div>
      </section>

      <section className="ngo-layout">
        <div className="content-left">
          <div className="panel" id="triage">
            <div className="panel-header">
              <div>
                <h2>Latest Assistance Requests</h2>
                <p>Review and manage requests assigned to your organization.</p>
              </div>

              <button type="button" onClick={fetchRequests}>
                Refresh
              </button>
            </div>

            {message && (
              <p
                className={
                  messageType === "success"
                    ? "success-message"
                    : "error-message"
                }
              >
                {message}
              </p>
            )}

            {loading && <p>Loading requests...</p>}

            <div className="ngo-request-table">
              <div className="ngo-request-row ngo-request-head">
                <span>Patient</span>
                <span>Need</span>
                <span>Location</span>
                <span>Priority</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {!loading && requests.length === 0 && (
                <div className="ngo-request-row">
                  <span>No assigned assistance requests.</span>
                </div>
              )}

              {!loading &&
                requests.map((request) => (
                  <div
                    className="ngo-request-row"
                    key={request.assistance_request_id}
                  >
                    <div className="patient-cell">
                      <div className="patient-avatar">
                        {getInitial(request.full_name)}
                      </div>

                      <div>
                        <h3>{request.full_name || "Patient"}</h3>
                        <p>
                          {request.patient_id
                            ? `PT-${String(request.patient_id).padStart(
                                3,
                                "0",
                              )}`
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <span>{formatText(request.request_type)}</span>

                    <span>{request.location || "N/A"}</span>

                    <span
                      className={`priority-badge ${getPriorityClass(
                        request.urgency_level,
                      )}`}
                    >
                      {formatText(request.urgency_level)}
                    </span>

                    <span
                      className={`status ${getStatusClass(request.status)}`}
                    >
                      {formatText(request.status)}
                    </span>

                    <div className="row-actions">
                      <button
                        type="button"
                        className="mini-btn"
                        disabled={request.status === "approved"}
                        onClick={() =>
                          updateRequestStatus(
                            request.assistance_request_id,
                            "approved",
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        className="mini-btn"
                        disabled={request.status === "in_progress"}
                        onClick={() =>
                          updateRequestStatus(
                            request.assistance_request_id,
                            "in_progress",
                          )
                        }
                      >
                        Start
                      </button>

                      <button
                        type="button"
                        className="mini-btn"
                        disabled={request.status === "completed"}
                        onClick={() =>
                          updateRequestStatus(
                            request.assistance_request_id,
                            "completed",
                          )
                        }
                      >
                        Complete
                      </button>

                      <button
                        type="button"
                        className="icon-mini-btn danger-icon-btn"
                        disabled={request.status === "rejected"}
                        onClick={() =>
                          updateRequestStatus(
                            request.assistance_request_id,
                            "rejected",
                          )
                        }
                      >
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
            <h2>Active Support</h2>

            <div className="progress-circle">
              <span>{requests.length}</span>
            </div>

            <p>
              Requests currently approved or in progress under your
              organization.
            </p>
          </div>

          <div className="panel" id="emergency">
            <h2>Emergency Coordination</h2>

            {requests
              .filter(
                (request) =>
                  request.urgency_level === "critical" ||
                  request.urgency_level === "high",
              )
              .slice(0, 2)
              .map((request) => (
                <div
                  className="alert-card critical-alert"
                  key={request.assistance_request_id}
                >
                  <span className="material-symbols-outlined">emergency</span>

                  <div>
                    <h3>{formatText(request.request_type)}</h3>
                    <p>
                      {request.full_name || "Patient"} needs urgent support in{" "}
                      {request.location || "unknown location"}.
                    </p>
                  </div>
                </div>
              ))}

            {requests.filter(
              (request) =>
                request.urgency_level === "critical" ||
                request.urgency_level === "high",
            ).length === 0 && (
              <div className="alert-card">
                <span className="material-symbols-outlined">
                  health_and_safety
                </span>

                <div>
                  <h3>No critical requests</h3>
                  <p>No urgent humanitarian cases assigned right now.</p>
                </div>
              </div>
            )}
          </div>

          <div className="panel" id="reports">
            <h2>Analytics Snapshot</h2>

            <div className="analytics-list">
              <div className="analytics-item">
                <span>Total Requests</span>
                <strong>{requests.length}</strong>
              </div>

              <div className="analytics-item">
                <span>In progress</span>
                <strong>{inProgressCount}</strong>
              </div>

              <div className="analytics-item">
                <span>Approved</span>
                <strong>{approvedCount}</strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>NGO Account</h2>

            <div className="doctor-info">
              <div className="doctor-avatar">
                <span className="material-symbols-outlined">business</span>
              </div>

              <div>
                <h3>{ngo?.organization_name || "NGO Organization"}</h3>{" "}
                <p>
                  <p>{ngo?.organization_type || "Humanitarian Support"}</p>{" "}
                </p>{" "}
              </div>
            </div>

            <Link to="/ngo-profile">
              <button className="message-btn">
                <span className="material-symbols-outlined">settings</span>
                Manage Profile
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NgoDashboard;
