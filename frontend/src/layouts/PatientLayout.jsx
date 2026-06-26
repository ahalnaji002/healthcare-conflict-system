import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientSidebar from "../components/PatientSidebar";
import PatientTopbar from "../components/PatientTopbar";
import API from "../services/api";

function PatientLayout() {
  const location = useLocation();
  const path = location.pathname;

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setPatient(res.data.user);
      } catch (err) {
        console.error("Failed to load patient profile:", err);
      }
    };

    fetchPatientProfile();
  }, []);

  let pageInfo = {
    title: "Patient Portal",
    subtitle: "Manage your treatment, appointments, and medical follow-up.",
  };

  if (path === "/patient-dashboard") {
    pageInfo = {
      title: "Patient Dashboard",
      subtitle: "Track your treatment plan, appointments, and medical updates.",
    };
  } else if (path === "/patient-medications") {
    pageInfo = {
      title: "Medication Reminders",
      subtitle: "Review your medication schedule and treatment instructions.",
    };
  } else if (path === "/patient-appointments") {
    pageInfo = {
      title: "Appointments",
      subtitle: "Manage your appointments and follow-ups.",
    };
  } else if (path === "/patient-treatment") {
    pageInfo = {
      title: "Treatment Plan",
      subtitle: "Review your current treatment plan.",
    };
  } else if (path === "/patient-requests") {
    pageInfo = {
      title: "Assistance Requests",
      subtitle: "Track your medical and humanitarian requests.",
    };
  } else if (path === "/patient-progress") {
    pageInfo = {
      title: "Health Progress",
      subtitle: "Track your recovery progress.",
    };
  } else if (path === "/patient-chat") {
    pageInfo = {
      title: "Doctor Chat",
      subtitle: "Communicate with your assigned doctor.",
    };
  } else if (path === "/patient-profile") {
    pageInfo = {
      title: "Patient Profile",
      subtitle:
        "Manage your personal, medical, and emergency contact information.",
    };
  }

  return (
    <div className="dashboard-page">
      <PatientSidebar />

      <main className="dashboard-main">
        <PatientTopbar
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          patient={patient}
          user={patient}
        />

        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;
