import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ReceptionistQueue from './pages/ReceptionistQueue';
import DoctorQueue from './pages/DoctorQueue';
import PatientBookAppointment from './pages/PatientBookAppointment';
import PatientMyAppointments from './pages/PatientMyAppointments';
import PatientAppointmentDetails from './pages/PatientAppointmentDetails';

import ProtectedRoute from './components/ProtectedRoute';

import AdminClinic from './pages/AdminClinic';
import AdminUsers from './pages/AdminUsers';
import AdminDashboard from './pages/AdminDashboard';

import ReceptionistDashboard from './pages/ReceptionistDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AddPrescription from './pages/AddPrescription';
import AddReport from './pages/AddReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute role="admin">
            <AdminDashboard/>
          </ProtectedRoute>
        }/>

        <Route path="/admin/clinic" element={
          <ProtectedRoute role="admin">
            <AdminClinic/>
          </ProtectedRoute>
        }/>

        <Route path="/admin/users" element={
          <ProtectedRoute role="admin">
            <AdminUsers/>
          </ProtectedRoute>
        }/>

        <Route path="/receptionist/dashboard" element={
          <ProtectedRoute role="receptionist">
            <ReceptionistDashboard />
          </ProtectedRoute>
        }/>

        <Route path="/receptionist/queue" element={
          <ProtectedRoute role="receptionist">
            <ReceptionistQueue />
          </ProtectedRoute>
        }/>

        <Route path="/doctor/dashboard" element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }/>

        <Route path="/doctor/queue" element={
          <ProtectedRoute role="doctor">
            <DoctorQueue />
          </ProtectedRoute>
        }/>
        <Route path="/doctor/prescriptions/:appointmentId" element={
          <ProtectedRoute role="doctor">
            <AddPrescription />
          </ProtectedRoute>
        }/>
        <Route path="/doctor/reports/:appointmentId" element={
          <ProtectedRoute role="doctor">
            <AddReport />
          </ProtectedRoute>
        }/>

        <Route path="/patient/dashboard" element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }/>

        <Route path="/patient/book" element={
          <ProtectedRoute role="patient">
            <PatientBookAppointment/>
          </ProtectedRoute>
        }/>

        <Route path="/patient/appointments/my" element={
          <ProtectedRoute role="patient">
            <PatientMyAppointments/>
          </ProtectedRoute>
        }/>

        <Route path="/patient/appointments/:id" element={
          <ProtectedRoute role="patient">
            <PatientAppointmentDetails/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;