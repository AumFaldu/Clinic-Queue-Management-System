import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientAppointments(){

    const [appointments,setAppointments] = useState([]);
    const [date,setDate] = useState("");
    const [slot,setSlot] = useState("");

    useEffect(()=>{
        loadAppointments();
    },[])

    const loadAppointments = async ()=>{
        const res = await api.get("/appointments/my");
        setAppointments(res.data);
    }

    const book = async ()=>{
        await api.post("/appointments",{date,timeSlot:slot});
        alert("Booked");
        loadAppointments();
    }

    return (
        <div>

            <h2>Book Appointment</h2>

            <input type="date" onChange={(e)=>setDate(e.target.value)} />

            <select onChange={(e)=>setSlot(e.target.value)}>
                <option value="">Select Slot</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
            </select>

            <button onClick={book}>Book</button>

            <h3>My Appointments</h3>

            {appointments.map(a=>(
                <div key={a.id}>
                    Date : {a.date}
                    Slot : {a.timeSlot}
                    Status : {a.status}
                    Token : {a.queueToken}
                </div>
            ))}

        </div>
    )
}