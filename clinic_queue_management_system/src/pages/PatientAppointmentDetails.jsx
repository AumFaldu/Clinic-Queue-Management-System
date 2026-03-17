import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function PatientAppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await api.get(`/appointments/${id}`);
        setAppointment(res.data);
      } catch (err) {
        alert("Error loading appointment details");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) return <h3>Loading...</h3>;
  if (!appointment) return <p>No appointment found.</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Appointment Details</h2>
      <p><strong>Date:</strong> {appointment.date}</p>
      <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
      <p><strong>Status:</strong> {appointment.queueStatus}</p>
      <p><strong>Token:</strong> {appointment.queueToken}</p>

      {appointment.prescription && (
        <>
          <h3>Prescription</h3>
          <ul>
            {appointment.prescription.medicines.map((m, i) => (
              <li key={i}>{m.name} - {m.dosage}</li>
            ))}
          </ul>
          <p><strong>Notes:</strong> {appointment.prescription.notes}</p>
        </>
      )}

      {appointment.report && (
        <>
          <h3>Report</h3>
          <p><strong>Diagnosis:</strong> {appointment.report.diagnosis}</p>
          <p><strong>Tests:</strong> {appointment.report.tests}</p>
          <p><strong>Remarks:</strong> {appointment.report.remarks}</p>
        </>
      )}
    </div>
  );
}