import { useNavigate } from "react-router-dom";

export default function PatientDashboard(){

  const navigate = useNavigate();

  return (
    <div style={{padding:"30px"}}>
        <h2>Patient Dashboard</h2>

    <button onClick={()=>navigate("/patient/appointments/my")}>
        My Appointments
    </button>
    <button onClick={()=>navigate("/patient/book")}>
        Book Appointment
    </button>
    </div>
  )
}