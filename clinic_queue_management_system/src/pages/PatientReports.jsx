import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientReports(){

  const [data,setData] = useState([]);

  useEffect(()=>{
    api.get("/reports/my")
      .then(res=>setData(res.data))
      .catch(()=>alert("Error"));
  },[]);

  return (
    <div style={{padding:"30px"}}>
      <h2>My Reports</h2>

      {data.map(r=>(
        <div key={r.id} style={{border:"1px solid",margin:"10px",padding:"10px"}}>
          <p><b>Diagnosis:</b> {r.diagnosis}</p>
          <p><b>Tests:</b> {r.tests}</p>
          <p><b>Remarks:</b> {r.remarks}</p>
        </div>
      ))}
    </div>
  )
}