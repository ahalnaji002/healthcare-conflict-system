import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";
import DoctorTopbar from "../../components/DoctorTopbar";

function DoctorPatients() {
  const [doctor, setDoctor] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setDoctor(res.data.user);
      } catch (err) {
        setMessage(
          err.response?.data?.message || "Failed to load patients page",
        );
      }
    };

    fetchDoctorProfile();
  }, []);

  if (message) {
    return (
      <div style={{ padding: "30px", color: "red", fontWeight: "bold" }}>
        {message}
      </div>
    );
  }

  if (!doctor) {
    return <div style={{ padding: "30px" }}>Loading patients page...</div>;
  }

  return (
    <>
      <DoctorTopbar
        title="Patients Management"
        subtitle={`Welcome back, Dr. ${
          doctor.name || "Doctor"
        }. Review assigned patients, priorities, and follow-up status.`}
        doctor={doctor}
      />

      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Total Assigned</p>
            <h2>0</h2>
          </div>
          <span className="material-symbols-outlined">groups</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Critical Priority</p>
            <h2>0</h2>
          </div>
          <span className="material-symbols-outlined">priority_high</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Need Review</p>
            <h2>0</h2>
          </div>
          <span className="material-symbols-outlined">rate_review</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Stable Cases</p>
            <h2>0</h2>
          </div>
          <span className="material-symbols-outlined">verified</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header patients-toolbar">
          <div>
            <h2>Assigned Patients List</h2>
            <p>Search, filter, and open patient medical records.</p>
          </div>

          <div className="table-actions">
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search patient..." />
            </div>

            <select className="filter-select">
              <option>All Priorities</option>
              <option>Critical</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <div className="patients-management-table">
          <div className="patients-row patients-head">
            <span>Patient</span>
            <span>Condition</span>
            <span>Last Update</span>
            <span>Priority</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          <div className="patients-row">
            <div className="patient-cell">
              <div className="patient-avatar">-</div>
              <div>
                <h3>No assigned patients yet</h3>
                <p>Patients will appear after assignment.</p>
              </div>
            </div>

            <span>Not available</span>
            <span>Not available</span>
            <span className="priority-badge low">None</span>
            <span className="status pending">Waiting</span>

            <div className="row-actions">
              <Link to="/doctor-patient-record">
                <button className="mini-btn">Open Record</button>
              </Link>

              <button className="icon-mini-btn">
                <span className="material-symbols-outlined">chat</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorPatients;
