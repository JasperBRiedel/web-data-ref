import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTopSightings } from "../api/sightings"
import { useAuthentication } from "../hooks/authentication"
import { getAnimalByID } from "../api/animal"
import { getTrailByID } from "../api/trails"
import Spinner from "../components/Spinner"

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

    // Load recent sightings list
    const [sightings, setSightings] = useState([])

    useEffect(() => {
        getTopSightings(5).then(async sightings => {
            // fetch trails and animals for each sighting
            const sightingsWithExtras = await Promise.all(sightings.map(async sighting => {
                const trail = await getTrailByID(sighting.trail_id)
                const animal = await getAnimalByID(sighting.animal_id)

                return Promise.resolve({
                    id: sighting.id,
                    date: new Date(sighting.date).toLocaleDateString(),
                    time: sighting.time,
                    trail,
                    animal,
                })
            }))

            setSightings(sightingsWithExtras)
        })
    }, [])

    return <div className="flex justify-evenly items-center w-full">
        <div className="flex-grow-[3] max-w-4xl m-4 hidden md:block">
            {sightings.length == 0
                ? <Spinner />
                : <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Animal</th>
                            <th>Trail</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sightings.map(sighting =>
                            <tr key={sighting.id}>
                                <td>{sighting.animal.name}</td>
                                <td>{sighting.trail.name}</td>
                                <td>{sighting.date}</td>
                                <td>{sighting.time}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
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
                <button className="btn btn-primary mr-2" >Login</button>
                <button className="btn btn-secondary">Sign up</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
            <div>
                {/* This section is included for debugging and development purposes */}
                <h2>Default users</h2>
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>email</th>
                            <th>password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>admin</td>
                            <td>admin@srv.com</td>
                            <td>abc123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("admin@srv.com", "abc123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                        <tr>
                            <td>moderator</td>
                            <td>mod@srv.com</td>
                            <td>abc123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("mod@srv.com", "abc123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                        <tr>
                            <td>spotter</td>
                            <td>spot@srv.com</td>
                            <td>abc123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("spot@srv.com", "abc123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
}

export default Login