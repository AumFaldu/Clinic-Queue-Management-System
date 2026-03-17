import { useState } from "react";
import api from "../api/axios";

export default function CreateUserForm({reload}){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("doctor");

    const submit = async (e)=>{
        e.preventDefault();

        try{
            await api.post("/admin/users",{
                name,email,password,role
            });

            alert("User Created");

            setName("");
            setEmail("");
            setPassword("");

            reload();

        }catch{
            alert("Error creating user");
        }
    }

    return (
        <form onSubmit={submit}>

            <h3>Create User</h3>

            <input placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

            <input placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <select value={role}
                onChange={(e)=>setRole(e.target.value)}
            >
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
                <option value="patient">Patient</option>
            </select>

            <button>Create</button>

        </form>
    )
}