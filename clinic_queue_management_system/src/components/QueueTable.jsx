export default function QueueTable({queue,updateStatus}){
    return (
        <table>
            <thead>
                <tr>
                    <th>Token</th>
                    <th>Patient</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {queue.map((q)=>(
                    <tr key={q.id}>
                        <td>{q.token}</td>
                        <td>{q.patientName}</td>
                        <td>{q.status}</td>
                        <td>
                            <button onClick={()=>{updateStatus(q.id,"in_progess")}}>Start</button>
                            <button onClick={()=>{updateStatus(q.id,"done")}}>Done</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}