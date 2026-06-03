import { Outlet } from "react-router-dom";
import NgoSidebar from "../components/NgoSidebar";

function NgoLayout() {
  return (
    <div className="dashboard-page">
      <NgoSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default NgoLayout;