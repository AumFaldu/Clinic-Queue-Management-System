import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateUserForm from "../components/CreateUserForm";

export default function AdminUsers(){

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        loadUsers();
    },[])

    const loadUsers = async ()=>{
        try{
            const res = await api.get("/admin/users");
            setUsers(res.data);
        }catch{
            alert("Error loading users");
        }
    }

    return (
        <div>

            <CreateUserForm reload={loadUsers} />

            <h2>Users List</h2>

            {users.map(u=>(
                <div key={u.id}>
                    {u.name} | {u.email} | {u.role}
                </div>
            ))}

        </div>
    )
}