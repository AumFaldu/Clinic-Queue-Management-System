import { useEffect, useState } from "react";
import api from "../api/axios";

export default function DoctorQueue() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      const res = await api.get("/doctor/queue");
      setQueue(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    if (status === "waiting") return "orange";
    if (status === "in_progress") return "blue";
    if (status === "done") return "green";
    if (status === "skipped") return "red";
    return "black";
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Doctor Queue</h2>
      {queue.length === 0 && <p>No patients today</p>}
      {queue.map((q) => (
        <div
          key={q.appointmentId}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <p>
            <strong>Patient:</strong> {q.patientName}
          </p>
          <p>
            <strong>Token:</strong> {q.tokenNumber}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: getStatusColor(q.status) }}>{q.status}</span>
          </p>
          <button
            onClick={() => window.location.href = `/doctor/prescriptions/${q.appointmentId}`}
            style={{ marginRight: "5px" }}
          >
            Add Prescription
          </button>
          <button
            onClick={() => window.location.href = `/doctor/reports/${q.appointmentId}`}
          >
            Add Report
          </button>
        </div>
      ))}
    </div>
  );
}