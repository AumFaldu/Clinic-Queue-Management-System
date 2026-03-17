import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard(){

  const [clinic,setClinic] = useState(null);
  const [users,setUsers] = useState([]);
  const [showForm,setShowForm] = useState(false);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("doctor");

  useEffect(()=>{
    loadData();
  },[])

  const loadData = async ()=>{
    try{
      const c = await api.get("/admin/clinic");
      const u = await api.get("/admin/users");

      setClinic(c.data);
      setUsers(u.data);

    }catch(err){
      alert("Error loading admin data");
    }
  }

  const createUser = async (e)=>{
    e.preventDefault();

    try{
      await api.post("/admin/users",{
        name,
        email,
        password,
        role
      });

      alert("User Created");

      setShowForm(false);

      setName("");
      setEmail("");
      setPassword("");

      loadData();

    }catch(err){
      alert(err.response?.data?.error || "Error creating user");
    }
  }

  if(!clinic) return <h3>Loading...</h3>

  return (
    <div style={{padding:"30px"}}>

      <h2>Admin Dashboard</h2>

      <h3>{clinic.name}</h3>
      <p>{clinic.code}</p>

      <button onClick={()=>setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Create User"}
      </button>

      {showForm && (
        <form onSubmit={createUser} style={{marginTop:"20px"}}>
          <div>
            <input
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div>
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <button type="submit">Create</button>
        </form>
      )}

      <h3 style={{marginTop:"30px"}}>Users</h3>

      {users.map(u=>(
        <div key={u.id}>
          {u.name} | {u.email} | {u.role}
        </div>
      ))}

    </div>
  )
}