import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PatientRegister from "./pages/PatientRegister";
import JoinRequest from "./pages/JoinRequest";
import ForgotPassword from "./pages/ForgotPassword";
import PatientDashboard from "./pages/PatientDashboard";
import PatientMedications from "./pages/PatientMedications";
import PatientAppointments from "./pages/PatientAppointments";
import PatientTreatment from "./pages/PatientTreatment";
import PatientRequests from "./pages/PatientRequests";
import PatientProgress from "./pages/PatientProgress";
import PatientChat from "./pages/PatientChat";
import PatientProfile from "./pages/PatientProfile";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorPatientRecord from "./pages/DoctorPatientRecord";
import DoctorUpdateTreatment from "./pages/DoctorUpdateTreatment";
import DoctorChat from "./pages/DoctorChat";
import DoctorProfile from "./pages/DoctorProfile";
import NgoDashboard from "./pages/NgoDashboard";
import NgoTriage from "./pages/NgoTriage";
import NgoEmergency from "./pages/NgoEmergency";
import NgoResources from "./pages/NgoResources";
import NgoReports from "./pages/NgoReports";
import NgoProfile from "./pages/NgoProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminJoinRequests from "./pages/AdminJoinRequests";
import AdminAssistance from "./pages/AdminAssistance";
import AdminLogs from "./pages/AdminLogs";
import AdminRecords from "./pages/AdminRecords";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient-register" element={<PatientRegister />} />
      <Route path="/join-request" element={<JoinRequest />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/patient-medications" element={<PatientMedications />} />
      <Route path="/patient-appointments" element={<PatientAppointments />} />
      <Route path="/patient-treatment" element={<PatientTreatment />} />
      <Route path="/patient-requests" element={<PatientRequests />} />
      <Route path="/patient-progress" element={<PatientProgress />} />
      <Route path="/patient-chat" element={<PatientChat />} />
      <Route path="/patient-profile" element={<PatientProfile />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor-patients" element={<DoctorPatients />} />
      <Route path="/doctor-patient-record" element={<DoctorPatientRecord />} />
      <Route
        path="/doctor-update-treatment"
        element={<DoctorUpdateTreatment />}
      />
      <Route path="/doctor-chat" element={<DoctorChat />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
      <Route path="/ngo-dashboard" element={<NgoDashboard />} />
      <Route path="/ngo-triage" element={<NgoTriage />} />
      <Route path="/ngo-emergency" element={<NgoEmergency />} />
      <Route path="/ngo-resources" element={<NgoResources />} />
      <Route path="/ngo-reports" element={<NgoReports />} />
      <Route path="/ngo-profile" element={<NgoProfile />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-users" element={<AdminUsers />} />
      <Route path="/admin-join-requests" element={<AdminJoinRequests />} />
      <Route path="/admin-assistance" element={<AdminAssistance />} />
      <Route path="/admin-logs" element={<AdminLogs />} />
      <Route path="/admin-records" element={<AdminRecords />} />
      <Route path="/admin-reports" element={<AdminReports />} />
      <Route path="/admin-settings" element={<AdminSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
