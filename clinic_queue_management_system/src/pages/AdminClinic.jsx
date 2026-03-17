import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminClinic(){

    const [clinic,setClinic] = useState(null);

    useEffect(()=>{
        loadClinic();
    },[])

    const loadClinic = async ()=>{
        try{
            const res = await api.get("/admin/clinic");
            setClinic(res.data);
        }catch{
            alert("Error loading clinic");
        }
    }

    if(!clinic) return <h3>Loading...</h3>

    return (
        <div>
            <h2>Clinic Info</h2>

            <p><b>Name:</b> {clinic.name}</p>
            <p><b>Code:</b> {clinic.code}</p>
            <p><b>Total Doctors:</b> {clinic.doctorsCount}</p>
            <p><b>Total Patients:</b> {clinic.patientsCount}</p>
            <p><b>Total Receptionists:</b> {clinic.receptionistsCount}</p>
        </div>
    )
}