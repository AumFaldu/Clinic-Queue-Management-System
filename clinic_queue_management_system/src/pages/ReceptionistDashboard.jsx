import { useNavigate } from "react-router-dom";

export default function ReceptionistDashboard(){

  const navigate = useNavigate();

  return (
    <div style={{padding:"30px"}}>
      <h2>Receptionist Dashboard</h2>

      <button onClick={()=>navigate("/receptionist/queue")}>
        Manage Queue
      </button>
    </div>
  )
}