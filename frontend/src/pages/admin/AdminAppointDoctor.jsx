import { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";

function AdminAppointDoctor() {
  const [users, setUsers] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setMessageType("error");
          setMessage(data.message || "Failed to load users");
          return;
        }

        setUsers(data.users || []);
      } catch (err) {
        setMessageType("error");
        setMessage("Server connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const patients = useMemo(() => {
    return users.filter((user) => user.role === "patient");
  }, [users]);

  const doctors = useMemo(() => {
    return users.filter(
      (user) => user.role === "doctor" && user.status === "active",
    );
  }, [users]);

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!selectedPatient || !selectedDoctor) {
      setMessageType("error");
      setMessage("Please select both patient and doctor");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/assign-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patient_id: selectedPatient,
          doctor_id: selectedDoctor,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(data.message || "Failed to assign doctor");
        return;
      }

      setMessageType("success");
      setMessage("Doctor assigned to patient successfully");
      setSelectedPatient("");
      setSelectedDoctor("");
    } catch (err) {
      setMessageType("error");
      setMessage("Server connection error");
    }
  };

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Total Patients</p>
            <h2>{patients.length}</h2>
          </div>
          <span className="material-symbols-outlined">personal_injury</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Available Doctors</p>
            <h2>{doctors.length}</h2>
          </div>
          <span className="material-symbols-outlined">stethoscope</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Appoint Doctor for Patient</h2>
            <p>
              Select a patient and assign an approved doctor for follow-up care.
            </p>
          </div>
        </div>

        {loading && <p>Loading users...</p>}

        {message && (
          <p
            className={
              messageType === "success" ? "success-message" : "error-message"
            }
          >
            {message}
          </p>
        )}

        <form onSubmit={handleAssign} className="patient-form">
          <div className="form-grid">
            <div className="field">
              <label htmlFor="patient">Select Patient</label>
              <select
                id="patient"
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
              >
                <option value="">Choose patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.full_name} - {patient.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="doctor">Select Doctor</label>
              <select
                id="doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="">Choose doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.full_name} - {doctor.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Assign Doctor
          </button>
        </form>
      </section>
    </>
  );
}

export default AdminAppointDoctor;
