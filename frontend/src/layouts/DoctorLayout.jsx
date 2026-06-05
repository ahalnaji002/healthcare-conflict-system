import { Outlet } from "react-router-dom";
import DoctorSidebar from "../components/DoctorSidebar";

function DoctorLayout() {
  return (
    <div className="dashboard-page">
      <DoctorSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorLayout;