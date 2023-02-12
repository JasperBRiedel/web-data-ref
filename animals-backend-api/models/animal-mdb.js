// Need: getAll, getOne, create, update, delete

import { Animal } from "./animal.js"
import { ObjectId } from "mongodb"
import { db } from "../database/mongodb.js"


export async function getAll() {
    // Get the collection of all animals
    let allAnimalsResults = await db.collection("animals").find().toArray()
    // Convert the collection of results into a list of Animal objects
    return await allAnimalsResults.map((animalResult) =>
        Animal(animalResult._id, animalResult.name, animalResult.species))
}

export async function getByID(animalID) {
    // Get the collection of all animals
    let animalResult = await db.collection("animals").findOne({ _id: new ObjectId(animalID) })
    // Convert the result into an Animal object
    if (animalResult) {
        return Promise.resolve(
            Animal(animalResult._id, animalResult.name, animalResult.species)
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function create(animal) {
    // New animals should not have existing IDs, delete just to be sure.
    delete animal.id
    // Insert animal object and return resulting promise
    return db.collection("animals").insertOne(animal)
}

export async function update(animal) {
    // Convert ID into a mongoDB objectId and remove from object
    const animalID = new ObjectId(animal.id)
    delete animal.id
    // Create the update document
    const animalUpdateDocument = {
        "$set": animal
    }
    // Update the animal object by ID but excluding the ID itself and return resulting promise
    return db.collection("animals").updateOne({ _id: animalID }, animalUpdateDocument)
}

export async function deleteByID(animalID) {
    return db.collection("animals").deleteOne({ _id: new ObjectId(animalID) })
}