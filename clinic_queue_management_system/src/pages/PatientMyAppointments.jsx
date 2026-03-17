import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function PatientMyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/my");
      setAppointments(res.data);
    } catch (err) {
      alert("Error loading appointments");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "waiting") return "orange";
    if (status === "in_progress") return "blue";
    if (status === "done") return "green";
    if (status === "skipped") return "red";
    if (status === "scheduled") return "gray";
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Appointments</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Token</th>
            <th>Status</th>
            <th>Patient Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.appointmentDate}</td>
              <td>{a.timeSlot}</td>
              <td>{a.queueEntry?.tokenNumber ?? "-"}</td>
              <td style={{ color: getStatusColor(a.queueEntry?.status ?? a.status) }}>
                {a.queueEntry?.status ?? a.status}
              </td>
              <td>{a.queueEntry?.appointment?.patient?.name ?? "-"}</td>
              <td>
                <button onClick={() => navigate(`/patient/appointments/${a.id}`)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}