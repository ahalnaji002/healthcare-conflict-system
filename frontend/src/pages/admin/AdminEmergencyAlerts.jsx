import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";

function AdminEmergencyAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  const updateAlertStatus = async (alertId, status) => {
    try {
      await API.patch(`/emergency/${alertId}/status`, {
        status,
      });

      setAlerts((prev) =>
        prev
          .map((alert) =>
            alert.alert_id === alertId ? { ...alert, status } : alert,
          )
          .filter((alert) => alert.status !== "resolved"),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update alert status");
    }
  };

  const assignDoctor = async (alertId, doctorId) => {
    try {
      await API.patch(`/emergency/${alertId}/assign`, {
        doctor_id: doctorId,
      });

      setAlerts((prev) =>
        prev.map((alert) =>
          alert.alert_id === alertId
            ? {
                ...alert,
                doctor_id: doctorId,
                status: "in_progress",
              }
            : alert,
        ),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign doctor");
    }
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await API.get("/emergency/active");
        setAlerts(res.data.alerts || []);

        const doctorsRes = await API.get("/emergency/doctors");
        setDoctors(doctorsRes.data.doctors || []);
      } catch (err) {
        setMessage(
          err.response?.data?.message || "Failed to load emergency alerts",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return <div style={{ padding: "30px" }}>Loading emergency alerts...</div>;
  }

  if (message) {
    return (
      <div style={{ padding: "30px", color: "red", fontWeight: "bold" }}>
        {message}
      </div>
    );
  }

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box red">
          <div>
            <p>Active Alerts</p>
            <h2>{alerts.length}</h2>
          </div>
          <span className="material-symbols-outlined">emergency</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>New Alerts</p>
            <h2>{alerts.filter((alert) => alert.status === "new").length}</h2>
          </div>
          <span className="material-symbols-outlined">
            notifications_active
          </span>
        </div>

        <div className="stat-box blue">
          <div>
            <p>In Progress</p>
            <h2>
              {alerts.filter((alert) => alert.status === "in_progress").length}
            </h2>
          </div>
          <span className="material-symbols-outlined">pending_actions</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Response Team</p>
            <h2>Ready</h2>
          </div>
          <span className="material-symbols-outlined">health_and_safety</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Emergency Alerts</h2>
            <p>Review urgent patient emergency reports and locations.</p>
          </div>

          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>

        <div className="patients-management-table">
          <div className="patients-row patients-head emergency-alerts-head">
            <span>Alert ID</span>
            <span>Patient ID</span>
            <span>Mobile</span>
            <span>Location</span>
            <span>Description</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {alerts.length === 0 ? (
            <div className="patients-row">
              <span>No alerts</span>
              <span>Not available</span>
              <span>Not available</span>
              <span>Not available</span>
              <span>No emergency alerts right now.</span>
              <span className="status taken">Safe</span>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                className="patients-row emergency-alerts-row"
                key={alert.alert_id}
              >
                <span>#{alert.alert_id}</span>

                <span>
                  {alert.patient_id
                    ? `PT-${String(alert.patient_id).padStart(3, "0")}`
                    : "Anonymous"}
                </span>

                <span>{alert.mobile_number || "Not provided"}</span>

                <span>{alert.location || "No location"}</span>

                <span>{alert.description || "Emergency panic alert"}</span>

                <span
                  className={
                    alert.status === "new" ? "status pending" : "status taken"
                  }
                >
                  {alert.status || "new"}
                </span>

                <div className="row-actions">
                  <select
                    className="filter-select"
                    value={alert.doctor_id || ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        assignDoctor(alert.alert_id, e.target.value);
                      }
                    }}
                  >
                    <option value="">Assign Doctor</option>

                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.full_name}
                      </option>
                    ))}
                  </select>

                  {alert.status === "new" && (
                    <button
                      className="mini-btn"
                      onClick={() =>
                        updateAlertStatus(alert.alert_id, "in_progress")
                      }
                    >
                      In Progress
                    </button>
                  )}

                  <button
                    className="mini-btn"
                    onClick={() =>
                      updateAlertStatus(alert.alert_id, "resolved")
                    }
                  >
                    Resolved
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default AdminEmergencyAlerts;
