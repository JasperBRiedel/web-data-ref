import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimalByID } from "../api/animal";
import { getSightingByID } from "../api/sightings";
import { getTrailByID } from "../api/trails";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { useAuthentication } from "../hooks/authentication";

export default function SightingInfo() {
    const [loggedInUser] = useAuthentication()
    const { sightingID } = useParams()

    const [sighting, setSighting] = useState(null)
    useEffect(() => {
        getSightingByID(sightingID).then(sighting => setSighting(sighting)).catch(error => console.log(error))
    }, [])

    const [animal, setAnimal] = useState(null)
    useEffect(() => {
        if (sighting) {
            getAnimalByID(sighting.animal_id).then(animal => setAnimal(animal))
        }
    }, [sighting])

    const [trail, setTrail] = useState(null)
    useEffect(() => {
        if (sighting) {
            getTrailByID(sighting.trail_id).then(trail => setTrail(trail))
        }
    }, [sighting])

    const [user, setUser] = useState(null)
    useEffect(() => {
        if (sighting) {
            getUserByID(sighting.user_id, loggedInUser.authenticationKey).then(user => setUser(user))
        }
    }, [sighting])

    return <>
        <Nav />
        <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">Sighting</h2>
                {sighting == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">Date</div>
                            <div className="stat-value">{new Date(sighting.date).toLocaleDateString()}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">Time</div>
                            <div className="stat-value">{sighting.time}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">Trail</h2>
                {trail == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">Name</div>
                            <div className="stat-value whitespace-normal">{trail.name}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">Animal</h2>
                {animal == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">Name</div>
                            <div className="stat-value">{animal.name}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Species</div>
                            <div className="stat-value whitespace-normal">{animal.species}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">User</h2>
                {user == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">First Name</div>
                            <div className="stat-value whitespace-normal">{user.firstName}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Last Name</div>
                            <div className="stat-value whitespace-normal">{user.lastName}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Role</div>
                            <div className="stat-value whitespace-normal">{user.role}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </>
}