import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="dashboard-page">
      <AdminSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;