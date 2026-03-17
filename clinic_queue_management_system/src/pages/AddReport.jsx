import { useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function AddReport(){

  const {appointmentId} = useParams();

  const [diagnosis,setDiagnosis] = useState("");
  const [tests,setTests] = useState("");
  const [remarks,setRemarks] = useState("");

  const submit = async ()=>{
    try{
      await api.post(`/reports/${appointmentId}`,{
        diagnosis,
        tests,
        remarks
      });
      alert("Report Added");
    }catch{
      alert("Error");
    }
  };

  return (
    <div style={{padding:"30px"}}>
      <h2>Add Report</h2>

      <input placeholder="Diagnosis"
        onChange={e=>setDiagnosis(e.target.value)}
      />
      <br/>
      <input placeholder="Tests"
        onChange={e=>setTests(e.target.value)}
      />
      <br/>
      <textarea placeholder="Remarks"
        onChange={e=>setRemarks(e.target.value)}
      />

      <br/><br/>

      <button onClick={submit}>Submit</button>
    </div>
  )
}