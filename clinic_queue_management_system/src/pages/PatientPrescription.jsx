import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientPrescriptions(){

  const [data,setData] = useState([]);

  useEffect(()=>{
    api.get("/prescriptions/my")
      .then(res=>setData(res.data))
      .catch(()=>alert("Error"));
  },[]);

  return (
    <div style={{padding:"30px"}}>
      <h2>My Prescriptions</h2>

      {data.map(p=>(
        <div key={p.id} style={{border:"1px solid",margin:"10px",padding:"10px"}}>
          <p><b>Appointment:</b> {p.appointmentId}</p>
          <ul>
            {p.medicines.map((m,i)=>(
              <li key={i}>{m.name} - {m.dosage}</li>
            ))}
          </ul>
          <p>{p.notes}</p>
        </div>
      ))}
    </div>
  )
}