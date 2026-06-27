import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../../styles/dashboard.css";

function AdminAssistance() {
  const token = localStorage.getItem("token");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [ngos, setNgos] = useState([]);
  const [assignModal, setAssignModal] = useState(null);
  const [selectedNgoId, setSelectedNgoId] = useState("");
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "http://localhost:5000/api/requests/admin/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setRequests(data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load assistance requests.");
      } finally {
        setLoading(false);
      }
    };

    const fetchNGOs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/ngos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setNgos(data || []);
      } catch (err) {
        console.error("FETCH NGOS ERROR:", err);
      }
    };

    fetchNGOs();
    fetchRequests();
  }, [token]);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        request.full_name?.toLowerCase().includes(searchValue) ||
        request.email?.toLowerCase().includes(searchValue) ||
        request.location?.toLowerCase().includes(searchValue) ||
        request.request_type?.toLowerCase().includes(searchValue);

      const matchesPriority =
        priorityFilter === "All Priorities" ||
        request.urgency_level === priorityFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "All Status" ||
        request.status === statusFilter.toLowerCase().replace(" ", "_");

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [requests, search, priorityFilter, statusFilter]);

  const assignNGO = async () => {
    if (!assignModal || !selectedNgoId) return;

    try {
      setAssigning(true);

      await axios.put(
        `http://localhost:5000/api/requests/admin/assign/${assignModal.assistance_request_id}`,
        { ngo_id: selectedNgoId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRequests((prev) =>
        prev.map((request) =>
          request.assistance_request_id === assignModal.assistance_request_id
            ? {
                ...request,
                ngo_id: selectedNgoId,
                status: "in_progress",
                organization_name:
                  ngos.find(
                    (ngo) => String(ngo.ngo_id) === String(selectedNgoId),
                  )?.organization_name || "Assigned",
              }
            : request,
        ),
      );

      setAssignModal(null);
      setSelectedNgoId("");
    } catch (err) {
      console.error("ASSIGN NGO ERROR:", err);
      alert("Failed to assign NGO.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Total Requests</p>
            <h2>{requests.length}</h2>
          </div>
          <span className="material-symbols-outlined">request_page</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Critical</p>
            <h2>
              {requests.filter((r) => r.urgency_level === "critical").length}
            </h2>
          </div>
          <span className="material-symbols-outlined">priority_high</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Under Review</p>
            <h2>{requests.filter((r) => r.status === "pending").length}</h2>
          </div>
          <span className="material-symbols-outlined">hourglass_top</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Completed</p>
            <h2>{requests.filter((r) => r.status === "completed").length}</h2>
          </div>
          <span className="material-symbols-outlined">task_alt</span>
        </div>
      </section>

      <section className="admin-assistance-layout">
        <div className="content-left">
          <div className="panel">
            <div className="panel-header admin-users-toolbar">
              <div>
                <h2>All Assistance Requests</h2>
                <p>
                  Review request status, priority, assigned NGO, and response
                  progress.
                </p>
              </div>

              <div className="table-actions">
                <div className="search-box">
                  <span className="material-symbols-outlined">search</span>
                  <input
                    type="text"
                    placeholder="Search patient, NGO, or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select
                  className="filter-select"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option>All Priorities</option>
                  <option>Critical</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>

            <div className="assistance-admin-table">
              <div className="assistance-admin-row assistance-admin-head">
                <span>Patient</span>
                <span>Request</span>
                <span>Assigned NGO</span>
                <span>Priority</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {loading && <p>Loading assistance requests...</p>}

              {error && <p className="error-message">{error}</p>}

              {!loading && filteredRequests.length === 0 && (
                <p>No assistance requests found.</p>
              )}

              {!loading &&
                filteredRequests.map((request) => (
                  <div
                    className={`assistance-admin-row ${
                      request.urgency_level === "critical" ? "critical-row" : ""
                    }`}
                    key={request.assistance_request_id}
                  >
                    <div className="patient-cell">
                      <div className="patient-avatar">
                        {request.full_name?.charAt(0).toUpperCase() || "?"}
                      </div>

                      <div>
                        <h3>{request.full_name || "Unknown Patient"}</h3>
                        <p>
                          {request.location || "No location"} • PT-
                          {request.patient_id}
                        </p>
                      </div>
                    </div>

                    <span>{request.request_type}</span>

                    <span>{request.organization_name || "Not Assigned"}</span>

                    <span className={`priority-badge ${request.urgency_level}`}>
                      {request.urgency_level}
                    </span>

                    <span
                      className={
                        request.status === "completed"
                          ? "status taken"
                          : "status pending"
                      }
                    >
                      {request.status?.replace("_", " ")}
                    </span>

                    <div className="row-actions">
                      <button
                        className="mini-btn"
                        onClick={() => {
                          if (!request.ngo_id) {
                            setAssignModal(request);
                            setSelectedNgoId("");
                          }
                        }}
                      >
                        {request.ngo_id ? "Monitor" : "Assign NGO"}
                      </button>

                      <button className="icon-mini-btn">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>NGO Response Overview</h2>
                <p>
                  Compare active organizations by assigned cases and completion
                  rate.
                </p>
              </div>
            </div>

            <div className="ngo-response-grid">
              <div className="ngo-response-card">
                <span className="material-symbols-outlined">business</span>
                <div>
                  <h3>Hope Relief NGO</h3>
                  <p>86 assigned cases • 79 completed</p>
                </div>
                <strong>92%</strong>
              </div>

              <div className="ngo-response-card">
                <span className="material-symbols-outlined">business</span>
                <div>
                  <h3>Care Bridge NGO</h3>
                  <p>54 assigned cases • 43 completed</p>
                </div>
                <strong>80%</strong>
              </div>

              <div className="ngo-response-card warning-response">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <h3>North Health Support</h3>
                  <p>31 assigned cases • 18 completed</p>
                </div>
                <strong>58%</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel progress-panel">
            <h2>Resolution Rate</h2>

            <div className="progress-circle">
              <span>79%</span>
            </div>

            <p>
              Most assistance cases are completed, but critical requests still
              need faster NGO assignment.
            </p>
          </div>

          <div className="panel">
            <h2>Critical Monitoring</h2>

            <div className="alert-card critical-alert">
              <span className="material-symbols-outlined">warning</span>
              <div>
                <h3>Unassigned Critical Case</h3>
                <p>
                  Rami Saleh needs mobility support but has no NGO assigned.
                </p>
              </div>
            </div>

            <div className="alert-card">
              <span className="material-symbols-outlined">inventory_2</span>
              <div>
                <h3>Medical Kit Demand</h3>
                <p>Medical supply requests increased this week.</p>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Request Categories</h2>

            <div className="analytics-list">
              <div className="analytics-item">
                <span>Medical Supplies</span>
                <strong>46%</strong>
              </div>

              <div className="analytics-item">
                <span>Transportation</span>
                <strong>24%</strong>
              </div>

              <div className="analytics-item">
                <span>Financial Aid</span>
                <strong>18%</strong>
              </div>

              <div className="analytics-item">
                <span>Mobility Support</span>
                <strong>12%</strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Admin Actions</h2>

            <div className="doctor-actions-grid">
              <button className="message-btn">
                <span className="material-symbols-outlined">
                  assignment_ind
                </span>
                Assign NGO
              </button>

              <button className="message-btn secondary-message-btn">
                <span className="material-symbols-outlined">download</span>
                Export Requests
              </button>

              <button className="message-btn secondary-message-btn">
                <span className="material-symbols-outlined">analytics</span>
                Generate Summary
              </button>
            </div>
          </div>
        </div>
      </section>

      {assignModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-icon success">
              <span className="material-symbols-outlined">assignment_ind</span>
            </div>

            <h2>Assign NGO</h2>

            <p>
              Assign an NGO to handle request for{" "}
              <strong>{assignModal.full_name}</strong>
            </p>

            <select
              className="filter-select modal-select"
              value={selectedNgoId}
              onChange={(e) => setSelectedNgoId(e.target.value)}
            >
              <option value="">Select NGO</option>

              {ngos.map((ngo) => (
                <option key={ngo.ngo_id} value={ngo.ngo_id}>
                  {ngo.organization_name}
                </option>
              ))}
            </select>

            <div className="custom-modal-actions">
              <button
                type="button"
                className="secondary-plan-btn"
                onClick={() => {
                  setAssignModal(null);
                  setSelectedNgoId("");
                }}
                disabled={assigning}
              >
                Cancel
              </button>

              <button
                type="button"
                className="mini-btn"
                onClick={assignNGO}
                disabled={assigning || !selectedNgoId}
              >
                {assigning ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminAssistance;
