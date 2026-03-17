import { useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function AddPrescription() {
  const { appointmentId } = useParams();

  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);
  const [notes, setNotes] = useState("");

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const submit = async () => {
    try {
      await api.post(`/prescriptions/${appointmentId}`, {
        medicines,
        notes
      });
      alert("Prescription Added Successfully");
      setMedicines([{ name: "", dosage: "", duration: "" }]);
      setNotes("");
    } catch (err) {
      alert(err.response?.data?.error || "Error adding prescription");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Prescription</h2>

      {medicines.map((m, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <input
            placeholder="Medicine Name"
            value={m.name}
            onChange={(e) => handleMedicineChange(i, "name", e.target.value)}
          />
          <input
            placeholder="Dosage (e.g., 500mg)"
            value={m.dosage}
            onChange={(e) => handleMedicineChange(i, "dosage", e.target.value)}
          />
          <input
            placeholder="Duration (e.g., 5 days)"
            value={m.duration}
            onChange={(e) => handleMedicineChange(i, "duration", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addMedicine}>Add More Medicine</button>

      <br /><br />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>Submit Prescription</button>
    </div>
  );
}