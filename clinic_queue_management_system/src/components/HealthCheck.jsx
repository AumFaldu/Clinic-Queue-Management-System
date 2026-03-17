import { useEffect, useState } from "react";
import api from "../api/axios";

export default function HealthCheck() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await api.get("/health");
        setStatus(res.status === 200 ? "Server is Up ✅" : "Server Error ❌");
      } catch {
        setStatus("Server Error ❌");
      }
    };

    checkHealth();
  }, []);

  return <h3>{status}</h3>;
}