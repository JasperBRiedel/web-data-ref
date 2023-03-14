import { useEffect, useState } from "react"
import { getUserByID, update } from "../api/user"

export default function UserEdit({ userID, onSave }) {
    const [formData, setFormData] = useState({
        id: null,
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        password: "",
        authenticationKey: null,
    })
    const [statusMessage, setStatusMessage] = useState("")

    useEffect(() => {
        if (userID) {
            getUserByID(userID).then(user => {
                setFormData(user)
            })
        }
    }, [userID])

    function saveUser(e) {
        e.preventDefault()
        setStatusMessage("Saving...")
        update(formData).then(result => {
            setStatusMessage(result.message)

            if (typeof onSave === "function") {
                onSave()
            }
        })
    }

    return <div>
        <form className="flex-grow m-4 max-w-2xl" onSubmit={saveUser} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">First Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Jane"
                    className="input input-bordered w-full"
                    value={formData.firstName}
                    onChange={(e) => setFormData(existing => { return { ...existing, firstName: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Last Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full"
                    value={formData.lastName}
                    onChange={(e) => setFormData(existing => { return { ...existing, lastName: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Role</span>
                </label>
                <select
                    className="select select-bordered"
                    value={formData.role}
                    onChange={(e) => setFormData(existing => { return { ...existing, role: e.target.value } })}
                    disabled={formData.role != "admin"}
                >
                    <option disabled selected>Pick one</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="spotter">Spotter</option>
                </select>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="user@server.tld"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={(e) => setFormData(existing => { return { ...existing, email: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    value={formData.password}
                    onChange={(e) => setFormData(existing => { return { ...existing, password: e.target.value } })}
                />
            </div>
            <div className="my-2">
                <button className="btn btn-primary mr-2" >Save</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}