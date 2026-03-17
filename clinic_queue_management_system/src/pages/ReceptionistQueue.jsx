import { useState } from "react";
import api from "../api/axios";

export default function ReceptionistQueue() {
  const [queue, setQueue] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const loadQueue = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/queue?date=${date}`);
      setQueue(res.data);
    } catch (err) {
      alert("Error loading queue");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/queue/${id}`, { status });
      loadQueue();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const getNextActions = (status) => {
    if (status === "waiting") return ["in_progress", "skipped"];
    if (status === "in_progress") return ["done"];
    return [];
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Daily Queue</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={loadQueue} disabled={loading}>
        {loading ? "Loading..." : "Load Queue"}
      </button>

      {queue.length === 0 && <p>No patients for this date</p>}

      {queue.map((q) => (
        <div key={q.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p>Token: {q.tokenNumber}</p>
          <p>Status: {q.status}</p>
          {getNextActions(q.status).map((action) => (
            <button
              key={action}
              onClick={() => updateStatus(q.id, action)}
              style={{ marginRight: "5px" }}
            >
              {action.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}