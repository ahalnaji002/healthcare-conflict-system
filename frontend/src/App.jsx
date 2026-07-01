import { Routes, Route } from "react-router-dom";

// Public & Auth Pages
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import PatientRegister from "./pages/public/PatientRegister";
import VerificationCode from "./pages/public/VerificationCode";
import JoinRequest from "./pages/public/JoinRequest";
import ForgotPassword from "./pages/public/ForgotPassword";
import NotFound from "./pages/public/NotFound";
import EmergencyAlert from "./pages/public/EmergencyAlert";

// Patient Pages
import PatientLayout from "./layouts/PatientLayout";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientMedications from "./pages/patient/PatientMedications";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientTreatment from "./pages/patient/PatientTreatment";
import PatientRequests from "./pages/patient/PatientRequests";
import PatientProgress from "./pages/patient/PatientProgress";
import PatientChat from "./pages/patient/PatientChat";
import PatientProfile from "./pages/patient/PatientProfile";

// Doctor Pages
import DoctorLayout from "./layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorPatientRecord from "./pages/doctor/DoctorPatientRecord";
import DoctorUpdateTreatment from "./pages/doctor/DoctorUpdateTreatment";
import DoctorChat from "./pages/doctor/DoctorChat";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorCriticalAlerts from "./pages/doctor/DoctorCriticalAlerts";

// NGO Pages
import NgoLayout from "./layouts/NgoLayout";
import NgoDashboard from "./pages/ngo/NgoDashboard";
import NgoTriage from "./pages/ngo/NgoTriage";
import NgoEmergency from "./pages/ngo/NgoEmergency";
import NgoResources from "./pages/ngo/NgoResources";
import NgoReports from "./pages/ngo/NgoReports";
import NgoProfile from "./pages/ngo/NgoProfile";

// Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJoinRequests from "./pages/admin/AdminJoinRequests";
import AdminAssistance from "./pages/admin/AdminAssistance";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminRecords from "./pages/admin/AdminRecords";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminEmergencyAlerts from "./pages/admin/AdminEmergencyAlerts";
import AdminAppointDoctor from "./pages/admin/AdminAppointDoctor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient-register" element={<PatientRegister />} />
      <Route path="/verify-account" element={<VerificationCode />} />
      <Route path="/join-request" element={<JoinRequest />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/emergency-alert" element={<EmergencyAlert />} />

      <Route element={<PatientLayout />}>
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient-medications" element={<PatientMedications />} />
        <Route path="/patient-appointments" element={<PatientAppointments />} />
        <Route path="/patient-treatment" element={<PatientTreatment />} />
        <Route path="/patient-requests" element={<PatientRequests />} />
        <Route path="/patient-progress" element={<PatientProgress />} />
        <Route path="/patient-chat" element={<PatientChat />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
      </Route>

      <Route element={<DoctorLayout />}>
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-patients" element={<DoctorPatients />} />
        <Route
          path="/doctor-critical-alerts"
          element={<DoctorCriticalAlerts />}
        />
        <Route
          path="/doctor-patient-record"
          element={<DoctorPatientRecord />}
        />
        <Route
          path="/doctor-patient-record/:patientId"
          element={<DoctorPatientRecord />}
        />
        <Route
          path="/doctor-update-treatment"
          element={<DoctorUpdateTreatment />}
        />
        <Route path="/doctor-chat" element={<DoctorChat />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
      </Route>

      <Route element={<NgoLayout />}>
        <Route path="/ngo-dashboard" element={<NgoDashboard />} />
        <Route path="/ngo-triage" element={<NgoTriage />} />
        <Route path="/ngo-emergency" element={<NgoEmergency />} />
        <Route path="/ngo-resources" element={<NgoResources />} />
        <Route path="/ngo-reports" element={<NgoReports />} />
        <Route path="/ngo-profile" element={<NgoProfile />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-join-requests" element={<AdminJoinRequests />} />
        <Route path="/admin-assistance" element={<AdminAssistance />} />
        <Route path="/admin-logs" element={<AdminLogs />} />
        <Route path="/admin-records" element={<AdminRecords />} />
        <Route path="/admin-reports" element={<AdminReports />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/admin-appoint-doctor" element={<AdminAppointDoctor />} />
        <Route
          path="/admin-emergency-alerts"
          element={<AdminEmergencyAlerts />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
