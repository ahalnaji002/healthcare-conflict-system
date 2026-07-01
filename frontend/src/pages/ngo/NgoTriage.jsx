import { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";

function NgoTriage() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await API.get("/requests/ngo/my-tasks");
      setRequests(res.data || []);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to load request history",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const historyRequests = useMemo(() => {
    return requests
      .filter((request) =>
        ["approved", "rejected", "completed"].includes(request.status),
      )
      .filter((request) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
          request.full_name?.toLowerCase().includes(search) ||
          request.location?.toLowerCase().includes(search) ||
          request.request_type?.toLowerCase().includes(search);

        const matchesStatus =
          statusFilter === "All Statuses" ||
          request.status === statusFilter.toLowerCase();

        const matchesType =
          typeFilter === "All Types" || request.request_type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      });
  }, [requests, searchTerm, statusFilter, typeFilter]);

  const completedCount = historyRequests.filter(
    (request) => request.status === "completed",
  ).length;

  const approvedCount = historyRequests.filter(
    (request) => request.status === "approved",
  ).length;

  const rejectedCount = historyRequests.filter(
    (request) => request.status === "rejected",
  ).length;

  const getInitial = (name) => {
    if (!name) return "P";
    return name.trim().charAt(0).toUpperCase();
  };

  const getStatusClass = (status) => {
    if (status === "rejected") return "cancelled";
    return "taken";
  };

  const formatText = (value) => {
    if (!value) return "N/A";
    return value.replace("_", " ");
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box green">
          <div>
            <p>Completed</p>
            <h2>{completedCount}</h2>
          </div>
          <span className="material-symbols-outlined">check_circle</span>
        </div>

        <div className="stat-box blue">
          <div>
            <p>Approved</p>
            <h2>{approvedCount}</h2>
          </div>
          <span className="material-symbols-outlined">task_alt</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Rejected</p>
            <h2>{rejectedCount}</h2>
          </div>
          <span className="material-symbols-outlined">cancel</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Total History</p>
            <h2>{historyRequests.length}</h2>
          </div>
          <span className="material-symbols-outlined">history</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header triage-toolbar">
          <div>
            <h2>Processed Assistance Requests</h2>
            <p>Review previously completed requests.</p>
          </div>

          <div className="table-actions">
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>

              <input
                type="text"
                placeholder="Search patient or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Completed</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <select
              className="filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All Types</option>
              <option>Medical Supplies</option>
              <option>Transportation</option>
              <option>Financial Aid</option>
              <option>Mobility Support</option>
            </select>
          </div>
        </div>

        {message && <p className="error-message">{message}</p>}
        {loading && <p>Loading request history...</p>}

        <div className="triage-table">
          <div className="triage-row triage-head">
            <span>Patient</span>
            <span>Request Type</span>
            <span>Location</span>
            <span>Status</span>
            <span>Processed On</span>
            <span>Details</span>
          </div>

          {!loading && historyRequests.length === 0 && (
            <div className="triage-row">
              <span>No processed requests found.</span>
            </div>
          )}

          {!loading &&
            historyRequests.map((request) => (
              <div className="triage-row" key={request.assistance_request_id}>
                <div className="patient-cell">
                  <div className="patient-avatar">
                    {getInitial(request.full_name)}
                  </div>

                  <div>
                    <h3>{request.full_name || "Patient"}</h3>
                    <p>
                      {request.patient_id
                        ? `PT-${String(request.patient_id).padStart(3, "0")}`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <span>{formatText(request.request_type)}</span>

                <span>{request.location || "N/A"}</span>

                <span className={`status ${getStatusClass(request.status)}`}>
                  {formatText(request.status)}
                </span>

                <span>{formatDate(request.updated_at)}</span>
                <div className="row-actions">
                  <button type="button" className="mini-btn">
                    View
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default NgoTriage;
