import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";

function DoctorCriticalAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const doctorId = user?.id || user?.user_id;

        const res = await API.get(`/emergency/doctor/${doctorId}`);

        setAlerts(res.data.alerts || []);
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
    return <div style={{ padding: "30px" }}>Loading critical alerts...</div>;
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
          <div className="patients-row patients-head">
            <span>Alert ID</span>
            <span>Patient ID</span>
            <span>Mobile</span>
            <span>Location</span>
            <span>Description</span>
            <span>Status</span>
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
              <div className="patients-row" key={alert.alert_id}>
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
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default DoctorCriticalAlerts;
