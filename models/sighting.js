import { ObjectId } from "mongodb"
import { db } from "../database/mongodb.js";

export function Sighting(
    _id,
    userId,
    trailName,
    animalName,
    animalCount,
    animalSpecies,
    sightingTime,
) {
    return {
        _id,
        userId,
        trailName,
        animalName,
        animalCount,
        animalSpecies,
        sightingTime,
    }
}

export async function getAll() {
    return db.collection("sightings").find().toArray()
}

export async function getByPage(page, size) {
    // Calculate page offset
    const offset = page * size

    return db.collection("sightings").find().skip(offset).limit(size).toArray()
}

export async function getById(id) {
    // attempt to find the first matching sightings by id
    let sighting = await db.collection("sightings").findOne({ _id: new ObjectId(id) })

    // check if a sightings was found and handle the result
    if (sighting) {
        return sighting
    } else {
        return Promise.reject("sighting not found with id " + id)
    }
}

export async function getByUserId(id) {
    // attempt to find the first matching sightings by user id
    let sighting = await db.collection("sightings").findOne({ userId: new ObjectId(id) })

    // check if a sightings was found and handle the result
    if (sighting) {
        return sighting
    } else {
        return Promise.reject("sighting not found with user id " + id)
    }
}

export async function create(sighting) {
    // Clear _id from sighting to ensure the new sighting does not 
    // have an existing _id from the database, as we want a new _id
    // to be created and added to the sighting object.
    delete sighting.id

    // Insert the sighting document and implicitly add the new _id to sighting
    return db.collection("sightings").insertOne(sighting)
}

export async function createMany(sightings) {
    // Clear _id from sightings to ensure the new sightings do not 
    // have existing _ids from the database, as we want new _ids
    // to be created and added to the sighting objects.
    for (const sighting of sightings) {
        delete sighting.id
    }

    // Insert the sighting document and implicitly add the new _id to sighting
    return db.collection("sightings").insertMany(sightings)
}

// TODO: findMostAnimalsSightedOnTrail
// TODO: findSightingsOnTrailByTimeRange
// TODO: findMostAnimalsSightedOnAllTrails

export async function updateByIdAnimalCount(id, count) {
    // update the sighting count using $set operator
    // all other fields remain untouched.
    return db.collection("sightings").updateOne({ _id: new ObjectId(id) }, { $set: { animalCount: count } })
}

export async function updateByIdAnimalSpecies(id, species) {
    // update the sighting species using $set operator
    // all other fields remain untouched.
    return db.collection("sightings").updateOne({ _id: new ObjectId(id) }, { $set: { animalSpecies: species } })
}