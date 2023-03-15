import { useEffect, useState } from "react"
import { getAllUsers } from "../api/user"
import Nav from "../components/Nav"
import Spinner from "../components/Spinner"
import UserEdit from "../components/UserEdit"

export default function UserCRUD() {
    const [refreshTrigger, setRefreshTrigger] = useState()
    const [selectedUserID, setSelectedUserID] = useState(null)

    // Load user list
    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers()
            .then(users => {
                setUsers(users)
            })
    }, [refreshTrigger])

    return <>
        <Nav />
        <div className="container mx-auto grid grid-cols-2 gap-2">
            <div className="rounded border-2 border-primary p-2">
                <h2>Users</h2>
                <div className="overflow-auto w-full">
                    {users == null
                        ? <Spinner />
                        : <table className="table table-compact w-full overflow-scroll">
                            <thead>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Select</th>
                            </thead>
                            <tbody>
                                {users.map(user =>
                                    <tr key={user.id}>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <button
                                            className="btn btn-xs mt-1"
                                            onClick={() => setSelectedUserID(user.id)}
                                        >Edit</button>
                                    </tr>)}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2>Selected User</h2>
                <UserEdit
                    userID={selectedUserID}
                    onSave={() => setRefreshTrigger({})}
                    allowEditRole={true} />

            </div>
        </div >
    </>
} 