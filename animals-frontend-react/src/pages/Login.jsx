import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"

function Login() {
    const navigate = useNavigate()

    const [user, login, logout] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function onLoginSubmit(e) {
        e.preventDefault()
        setStatusMessage("Logging in...")

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
            setStatusMessage("Invalid email address")
            return
        }

        login(formData.email, formData.password)
            .then(result => {
                setStatusMessage("Login successful!")
                navigate("/dashboard")
            })
            .catch(error => {
                setStatusMessage("Login failed: " + error)
            })
    }

    return <div className="flex justify-evenly items-center w-full">
        <div className="flex-grow-[3] max-w-4xl m-4 hidden md:block">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Animal</th>
                        <th>Trail</th>
                        <th>User</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bird</td>
                        <td>Mountain Trail</td>
                        <td>Jane Doe</td>
                        <td>10:00 AM</td>
                    </tr>
                    <tr>
                        <td>Bird</td>
                        <td>Mountain Trail</td>
                        <td>Jane Doe</td>
                        <td>10:00 AM</td>
                    </tr>
                    <tr>
                        <td>Bird</td>
                        <td>Mountain Trail</td>
                        <td>Jane Doe</td>
                        <td>10:00 AM</td>
                    </tr>
                    <tr>
                        <td>Bird</td>
                        <td>Mountain Trail</td>
                        <td>Jane Doe</td>
                        <td>10:00 AM</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="divider divider-horizontal h-screen mx-0 hidden md:flex"></div>
        <form className="flex-grow m-4 max-w-lg" onSubmit={onLoginSubmit}>
            <h2 className="text-4xl text-center mb-8">Animal Spotting App</h2>
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
                <label className="label">
                    <span className="label-text-alt">Validation text</span>
                    <span className="label-text-alt">Debug state: {formData.email}</span>
                </label>
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
                <label className="label">
                    <span className="label-text-alt">Validation text</span>
                    <span className="label-text-alt">Debug state: {formData.password}</span>
                </label>
            </div>
            <div>
                <button className="btn btn-primary mr-4" >Login</button>
                <button className="btn btn-secondary">Sign up</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}

export default Login