import { useNavigate } from "react-router-dom";

export default function DoctorDashboard(){

  const navigate = useNavigate();

  return (
    <div style={{padding:"30px"}}>
      <h2>Doctor Dashboard</h2>

      <button onClick={()=>navigate("/doctor/queue")}>
        View Queue
      </button>
    </div>
  )
}