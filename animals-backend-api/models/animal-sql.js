import { Animal } from "./animal.js"
import { db } from "../database/mysql.js"


export async function getAll() {
    // Get the collection of all animals
    const [allAnimalsResults] = await db.query("SELECT * FROM animals")
    // Convert the collection of results into a list of Animal objects
    return await allAnimalsResults.map((animalResult) =>
        Animal(animalResult.id, animalResult.name, animalResult.species))
}

export async function getByID(animalID) {
    // Get the collection of all animals
    const [animalsResults] = await db.query(
        "SELECT * FROM animals WHERE id = ?", animalID
    )
    // Convert the result into an Animal object
    if (animalsResults.length > 0) {
        const animalResult = animalsResults[0];
        return Promise.resolve(
            Animal(animalResult.id, animalResult.name, animalResult.species)
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function create(animal) {
    // New animals should not have existing IDs, delete just to be sure.
    delete animal.id
    // Insert animal object and return resulting promise
    return db.query(
        "INSERT INTO animals (name, species) VALUES (?, ?)",
        [animal.name, animal.species]
    ).then(([result]) => {
        // Inject the inserted ID into the animal object and return
        return { ...animal, id: result.insertId }
    })
}

export async function update(animal) {
    return db.query(
        "UPDATE animals SET name = ?, species = ? WHERE id = ?",
        [animal.name, animal.species, animal.id]
    )
}

export async function deleteByID(animalID) {
    return db.query("DELETE FROM animals WHERE id = ?", animalID)
}