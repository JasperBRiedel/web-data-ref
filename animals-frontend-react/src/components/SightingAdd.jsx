import { useEffect, useState } from "react"
import { getAllAnimals } from "../api/animal"
import { getAllTrails } from "../api/trails"
import { createSighting } from "../api/sightings"
import { useAuthentication } from "../hooks/authentication"

export function SightingAdd({ onAdded }) {
    const [user, login, logout] = useAuthentication()

    const [formData, setFormData] = useState({
        animal_id: "",
        trail_id: "",
        time: "",
        date: "",
    })
    const [statusMessage, setStatusMessage] = useState("")

    // Load animals
    const [animals, setAnimals] = useState([])
    useEffect(() => {
        getAllAnimals().then(animals => setAnimals(animals))
    }, [])

    // Load trails
    const [trails, setTrails] = useState([])
    useEffect(() => {
        getAllTrails().then(trails => setTrails(trails))
    }, [])

    function addSighting(e) {
        e.preventDefault()
        setStatusMessage("Creating sighting...")

        // Add user_id to the sighting object before sending
        const sightingData = {
            ...formData,
            user_id: user.id,
        }

        createSighting(sightingData, user.authenticationKey).then(result => {
            setStatusMessage(result.message)
            setFormData({
                animal_id: "",
                trail_id: "",
                time: "",
                date: "",
            })

            if (typeof onAdded === "function") {
                onAdded()
            }
        })
    }

    return <div>
        <form className="flex-grow m-4 max-w-2xl" onSubmit={addSighting} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Animal</span>
                </label>
                <select
                    className="select select-bordered"
                    value={formData.animal_id}
                    onChange={(e) => setFormData(existing => { return { ...existing, animal_id: e.target.value } })}
                >
                    <option selected>Pick one</option>
                    {animals.map(animal => <option key={animal.id} value={animal.id}>{animal.name} - {animal.species}</option>)}
                </select>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Trail</span>
                </label>
                <select
                    className="select select-bordered"
                    value={formData.trail_id}
                    onChange={(e) => setFormData(existing => { return { ...existing, trail_id: e.target.value } })}
                >
                    <option selected>Pick one</option>
                    {trails.map(trail => <option key={trail.id} value={trail.id}>{trail.name}</option>)}
                </select>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Date of sighting</span>
                </label>
                <input
                    type="date"
                    className="input input-bordered w-full"
                    value={formData.date}
                    onChange={(e) => setFormData(existing => { return { ...existing, date: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Time of sighting</span>
                </label>
                <input
                    type="time"
                    className="input input-bordered w-full"
                    value={formData.time}
                    onChange={(e) => setFormData(existing => { return { ...existing, time: e.target.value } })}
                />
            </div>
            <div className="my-2">
                <button className="btn btn-primary mr-2" >Add</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}