import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import { registerUser } from "../api/user"

export default function Register() {
    const navigate = useNavigate()

    const [user, login, logout] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    })

    function onRegisterSubmit(e) {
        e.preventDefault()
        setStatusMessage("Registering...")

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
            setStatusMessage("Invalid email address")
            return
        }

        // TODO: Add validation for other fields

        // Register then attempt login
        registerUser(formData)
            .then(result => {
                setStatusMessage(result.message)
                login(formData.email, formData.password)
                    .then(result => {
                        setStatusMessage(result.message)
                        navigate("/dashboard")
                    })
                    .catch(error => {
                        setStatusMessage("Login failed: " + error)
                    })
            })
    }

    return <div className="flex justify-evenly items-center w-full">
        <form className="flex-grow m-4 max-w-lg" onSubmit={onRegisterSubmit}>
            <h1 className="text-4xl text-center mb-8">Animal Spotting App</h1>
            <h2 className="text-3xl text-center mb-8">Register Account</h2>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">First Name:</span>
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
                    <span className="label-text">Last Name:</span>
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
                <button className="btn btn-primary mr-2" >Register</button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}>Back</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}