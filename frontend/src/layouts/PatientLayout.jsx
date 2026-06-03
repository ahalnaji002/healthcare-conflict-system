import { Outlet } from "react-router-dom";
import PatientSidebar from "../components/PatientSidebar";

function PatientLayout() {
  return (
    <div className="dashboard-page">
      <PatientSidebar />
      
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;