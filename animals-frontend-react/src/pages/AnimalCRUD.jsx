import { useEffect, useState } from "react"
import { getAllAnimals, getAnimalByID } from "../api/animal"

export default function AnimalCRUD() {
    // Load animal list
    const [animals, setAnimals] = useState([])
    useEffect(() => {
        getAllAnimals()
            .then(animals => {
                setAnimals(animals)
            })
    }, [])

    // Load selected animal
    const [selectedAnimalID, setSelectedAnimalID] = useState(null)
    const [selectedAnimal, setSelectedAnimal] = useState(null)

    useEffect(() => {
        if (selectedAnimalID) {
            getAnimalByID(selectedAnimalID)
                .then(animal => {
                    setSelectedAnimal(animal)
                })
        } else {
            setSelectedAnimal({
                id: "",
                name: "",
                species: "",
            })
        }

    }, [selectedAnimalID])

    return <div className="container mx-auto grid grid-cols-2 gap-2">
        {/* Bird list */}
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Species</th>
                    <th>Select</th>
                </thead>
                <tbody>
                    {animals.map(animal =>
                        <tr key={animal.id}>
                            <td>{animal.id}</td>
                            <td>{animal.name}</td>
                            <td>{animal.species}</td>
                            <button
                                className="btn btn-xs mt-1"
                                onClick={() => setSelectedAnimalID(animal.id)}
                            >Select</button>
                        </tr>)}
                </tbody>
            </table>
        </div>
        {/* Bird edit form */}
        <div className="p-2">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Bird ID:</span>
                </label>
                <input
                    readOnly
                    type="text"
                    className="input input-bordered"
                    value={selectedAnimal.id}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Bird Name:</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered"
                    value={selectedAnimal.name}
                    onChange={(e) => setSelectedAnimal({ ...selectedAnimal, name: e.target.value })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Bird Species:</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered"
                    value={selectedAnimal.species}
                    onChange={(e) => setSelectedAnimal({ ...selectedAnimal, species: e.target.value })}
                />
            </div>
            <div className="pt-2 flex gap-2">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedAnimalID(null)
                        setSelectedAnimal({ id: "", name: "", species: "" })
                    }}
                >New</button>
                <button className="btn">Save</button>
                <button className="btn btn-secondary">Delete</button>
            </div>
        </div>
    </div>
} 