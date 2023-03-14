import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimalByID } from "../api/animal";
import { getTopSightings } from "../api/sightings";
import { getTrailByID } from "../api/trails";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function Sightings() {
    const navigate = useNavigate()

    // Load recent sightings list
    const [sightings, setSightings] = useState([])

    useEffect(() => {
        getTopSightings(200).then(async sightings => {
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

    return <>
        <Nav />
        <div className="container p-2 mx-auto">
            <div className="rounded border-2 border-primary p-2 w-full">
                {sightings.length == 0
                    ? <Spinner />
                    : <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Animal</th>
                                <th>Trail</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sightings.map(sighting =>
                                <tr key={sighting.id}>
                                    <td>{sighting.animal.name}</td>
                                    <td>{sighting.trail.name}</td>
                                    <td>{sighting.date}</td>
                                    <td>{sighting.time}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate("/sightings/" + sighting.id)}
                                            className="btn btn-primary btn-sm">Details</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
}