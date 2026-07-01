import { useEffect, useState } from "react";
import "../../styles/dashboard.css";

function AdminAppointDoctor() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [patientsRes, doctorsRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/unassigned-patients", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/doctors-list", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const patientsData = await patientsRes.json();
      const doctorsData = await doctorsRes.json();

      if (!patientsRes.ok) {
        setMessageType("error");
        setMessage(patientsData.message || "Failed to load patients");
        return;
      }

      if (!doctorsRes.ok) {
        setMessageType("error");
        setMessage(doctorsData.message || "Failed to load doctors");
        return;
      }

      setPatients(patientsData.patients || []);
      setDoctors(doctorsData.doctors || []);
    } catch (err) {
      setMessageType("error");
      setMessage("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!selectedPatient || !selectedDoctor) {
      setMessageType("error");
      setMessage("Please select both patient and doctor");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/assign-patient", {
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

      // refresh lists so the just-assigned patient drops out of "unassigned"
      fetchData();
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
            <p>Unassigned Patients</p>
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
            <h2>Assigned  Doctor for Patient</h2>
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
                  <option key={patient.patient_id} value={patient.patient_id}>
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
                  <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    Dr. {doctor.full_name}
                    {doctor.specialty ? ` - ${doctor.specialty}` : ""}
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
