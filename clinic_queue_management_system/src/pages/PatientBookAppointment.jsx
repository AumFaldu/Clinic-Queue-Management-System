import { useState } from "react";
import api from "../api/axios";

export default function PatientBookAppointment(){

  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [loading,setLoading] = useState(false);

  const bookAppointment = async () => {
    try{
      setLoading(true);

      await api.post("/appointments",{
        appointmentDate:date,
        timeSlot: time
      });

      alert("Appointment Booked Successfully");
      setDate("");
      setTime("");

    }catch(err){
      alert(err.response?.data?.error || "Booking Failed");
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div style={{padding:"30px"}}>
      <h2>Book Appointment</h2>

      <div>
        <label>Select Date</label>
        <br/>
        <input 
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Select Time Slot</label>
        <br/>
        <select
          value={time}
          onChange={(e)=>setTime(e.target.value)}
        >
          <option value="">Select Slot</option>
          <option value="09:00-09:15">09:00-09:15</option>
<option value="09:15-09:30">09:15-09:30</option>
<option value="09:30-09:45">09:30-09:45</option>
<option value="09:45-10:00">09:45-10:00</option>
<option value="10:00-10:15">10:00-10:15</option>
        </select>
      </div>

      <br/>
      <button onClick={bookAppointment} disabled={loading}>
        {loading ? "Booking..." : "Book"}
      </button>

    </div>
  )
}