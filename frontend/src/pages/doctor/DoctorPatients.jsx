import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";
import DoctorTopbar from "../../components/DoctorTopbar";

function DoctorPatients() {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await API.get("/auth/profile");
        setDoctor(profileRes.data.user);

        const patientsRes = await API.get("/auth/doctor-patients");
        setPatients(patientsRes.data.patients || []);
      } catch (err) {
        setMessage(
          err.response?.data?.message || "Failed to load patients page",
        );
      }
    };

    fetchData();
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

  const totalPatients = patients.length;

  const criticalPatients = patients.filter((patient) =>
    patient.medical_condition?.toLowerCase().includes("critical"),
  ).length;

  const needReview = patients.filter(
    (patient) => patient.medical_condition,
  ).length;

  const stablePatients = patients.filter(
    (patient) => patient.status === "active",
  ).length;

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
            <h2>{totalPatients}</h2>
          </div>
          <span className="material-symbols-outlined">groups</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Critical Priority</p>
            <h2>{criticalPatients}</h2>
          </div>
          <span className="material-symbols-outlined">priority_high</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Need Review</p>
            <h2>{needReview}</h2>
          </div>
          <span className="material-symbols-outlined">rate_review</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Stable Cases</p>
            <h2>{stablePatients}</h2>
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

          {patients.length === 0 ? (
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
                <button className="mini-btn">Open Record</button>
              </div>
            </div>
          ) : (
            patients.map((patient) => {
              const firstLetter = patient.full_name
                ? patient.full_name.charAt(0).toUpperCase()
                : "P";

              const patientCode = `PT-${String(patient.patient_id).padStart(
                3,
                "0",
              )}`;

              return (
                <div className="patients-row" key={patient.patient_id}>
                  <div className="patient-cell">
                    <div className="patient-avatar">{firstLetter}</div>

                    <div>
                      <h3>{patient.full_name || "Unknown Patient"}</h3>
                      <p>
                        {patientCode} •{" "}
                        {patient.city || patient.address || "No location"}
                      </p>
                    </div>
                  </div>

                  <span>
                    {patient.medical_condition || "No condition recorded"}
                  </span>

                  <span>
                    {patient.assigned_at
                      ? new Date(patient.assigned_at).toLocaleDateString()
                      : "Not available"}
                  </span>

                  <span className="priority-badge medium">Medium</span>

                  <span className="status taken">
                    {patient.status || "active"}
                  </span>

                  <div className="row-actions">
                    <Link to={`/doctor-patient-record/${patient.patient_id}`}>
                      <button className="mini-btn">Open Record</button>
                    </Link>

                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">chat</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}

export default DoctorPatients;
