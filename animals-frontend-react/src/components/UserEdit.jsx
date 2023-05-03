import { useEffect, useState } from "react"
import { create, deleteByID, getUserByID, update } from "../api/user"
import { useAuthentication } from "../hooks/authentication"

export default function UserEdit({ userID, onSave, allowEditRole }) {
    const [user] = useAuthentication()

    const [formData, setFormData] = useState({
        id: null,
        firstName: "",
        lastName: "",
        role: "spotter",
        email: "",
        password: "",
        authenticationKey: null,
    })
    const [statusMessage, setStatusMessage] = useState("")

    // Load selected user provided in userID prop
    useEffect(() => {
        if (userID) {
            getUserByID(userID, user.authenticationKey).then(user => {
                setFormData(user)
            })
        }
    }, [userID])

    // Clears the currently loaded user data from the form
    function clear() {
        setFormData({
            id: null,
            firstName: "",
            lastName: "",
            role: "spotter",
            email: "",
            password: "",
            authenticationKey: null,
        })
        setStatusMessage("")
    }

    // Updates or inserts a new user based on if the user
    // has an ID or not yet.
    function upsert() {
        if (formData.id) {
            // The user in the form has an ID which implies they
            // already exist in the database. Therefore we update.
            setStatusMessage("Updating user...")
            update(formData, user.authenticationKey).then(result => {
                setStatusMessage(result.message)

                if (typeof onSave === "function") {
                    onSave()
                }
            })
        } else {
            // The user in the form doesn't have an ID which implies they
            // DO NOT exist in the database. Therefore we create.
            setStatusMessage("Creating user...")
            create(formData, user.authenticationKey).then(result => {
                setStatusMessage(result.message)

                if (typeof onSave === "function") {
                    onSave()
                }

                // We also need to set the users new ID in form
                // in case the they are immediately updated after being
                // created.
                setFormData((existing) => ({ ...existing, id: result.user.id }))
            })
        }
    }

    // Delete the user with the currently loaded id in the form data
    function remove() {
        setStatusMessage("Deleting user...")
        deleteByID(formData.id, user.authenticationKey)
            .then(result => {
                setStatusMessage(result.message)

                if (typeof onSave === "function") {
                    onSave()
                }

                clear()
            })
    }

    return <div>
        <form className="flex-grow m-4 max-w-2xl">
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
                    disabled={!allowEditRole}
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
                <input
                    type="button"
                    value={formData.id ? "Update" : "Insert"}
                    onClick={() => upsert()}
                    className="btn btn-primary mr-2"
                />
                <input
                    type="button"
                    disabled={!formData.id}
                    value="Remove"
                    onClick={() => remove()}
                    className="btn btn-secondary mr-2"
                />
                <input
                    type="button"
                    value="Clear"
                    onClick={() => clear()}
                    className="btn btn-secondary"
                />

                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}