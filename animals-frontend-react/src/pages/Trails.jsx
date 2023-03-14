import { useEffect, useState } from "react";
import { getAllTrails } from "../api/trails";
import Nav from "../components/Nav";
import { XMLUpload } from "../components/XMLUpload";

export default function Trails() {
    const [trails, setTrails] = useState([])
    useEffect(() => {
        getAllTrails().then(trails => setTrails(trails))
    }, [])

    return <>
        <Nav />
        <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">All Trails</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                        </thead>
                        <tbody>
                            {trails.map(trail =>
                                <tr key={trail.id}>
                                    <td>{trail.id}</td>
                                    <td>{trail.name}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="rounded border-2 border-primary  min-h-16 p-2">
                <h2 className="text-center">Upload Trails</h2>
                <XMLUpload />
            </div>
        </div>
    </>
}