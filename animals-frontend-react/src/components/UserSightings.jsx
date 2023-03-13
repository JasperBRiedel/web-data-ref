import { useEffect, useState } from "react"
import { getAnimalByID } from "../api/animal"
import { getUserSightings } from "../api/sightings"
import { getTrailByID } from "../api/trails"
import Spinner from "./Spinner"

export default function UserSightings({ userID }) {
    const [sightings, setSightings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUserSightings(userID).then(async sightings => {
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
            setLoading(false)
        })
    }, [])

    return loading
        ? <Spinner />
        : <table className="table table-compact w-full">
            <thead>
                <th>Trail</th>
                <th>Animal</th>
                <th>Date</th>
                <th>Time</th>
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