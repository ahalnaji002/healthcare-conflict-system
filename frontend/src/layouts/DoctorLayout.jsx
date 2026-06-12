import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DoctorSidebar from "../components/DoctorSidebar";
import DoctorTopbar from "../components/DoctorTopbar";
import API from "../services/api";

function DoctorLayout() {
  const location = useLocation();
  const path = location.pathname;

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setDoctor(res.data.user);
      } catch (err) {
        console.error("Failed to load doctor profile:", err);
      }
    };

    fetchDoctorProfile();
  }, []);

  let pageInfo = {
    title: "Doctor Portal",
    subtitle: "Manage your medical follow-up workspace.",
  };

  if (path === "/doctor-dashboard") {
    pageInfo = {
      title: "Doctor Dashboard",
      subtitle:
        "Monitor patient cases, treatment updates, and urgent medical needs.",
    };
  } else if (path === "/doctor-patients") {
    pageInfo = {
      title: "Patients Management",
      subtitle: "Review assigned patients, priorities, and follow-up status.",
    };
  } else if (path.startsWith("/doctor-patient-record")) {
    pageInfo = {
      title: "Patient Medical Record",
      subtitle:
        "Review patient history, injury details, medication, and progress notes.",
    };
  } else if (path === "/doctor-update-treatment") {
    pageInfo = {
      title: "Update Treatment Plan",
      subtitle: "Create, edit, and manage patient treatment instructions.",
    };
  } else if (path === "/doctor-chat") {
    pageInfo = {
      title: "Patient Chat",
      subtitle: "Communicate with patients and respond securely.",
    };
  } else if (path === "/doctor-profile") {
    pageInfo = {
      title: "Doctor Profile",
      subtitle: "Manage professional information and account settings.",
    };
  }

  return (
    <div className="dashboard-page">
      <DoctorSidebar />

      <main className="dashboard-main">
        <DoctorTopbar
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          doctor={doctor}
        />

        <Outlet />
      </main>
    </div>
  );
}

export default DoctorLayout;
