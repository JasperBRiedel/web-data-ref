import { ObjectId } from "mongodb"
import { db } from "../database.js"

/**
 * Create a new sighting model object
 *
 * @export
 * @param {String | ObjectId | null} _id - mongoDB object ID for this sighting
 * @param {String | ObjectId} userId - mongoDB object ID for the associated user
 * @param {String} trailName - trail name
 * @param {String} animalName - animal name
 * @param {Number} animalCount - the number of that animal spotted
 * @param {String} animalSpecies - the species of the animal
 * @param {Date} sightingTime - the time and date of the sighting
 * @returns {Object} - The sighting model object
 */
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
        _id: new ObjectId(_id),
        userId: new ObjectId(userId),
        trailName,
        animalName,
        animalCount: parseInt(animalCount),
        animalSpecies,
        sightingTime: new Date(sightingTime),
    }
}

/**
 * Get all sightings
 *
 * @export
 * @async
 * @returns {Promise<Object[]>} - A promise for the array of all sighting objects
 */
export async function getAll() {
    return db.collection("sightings").find().toArray()
}


/**
 * Get paginated sightings 
 *
 * @export
 * @async
 * @param {*} page - the page number (1 indexed)
 * @param {*} size - the number of documents per page
 * @returns {Promise<Object[]>} - A promise for the array of sightings on the specified page
 */
export async function getByPage(page, size) {
    // Calculate page offset
    const offset = (page + 1) * size

    return db.collection("sightings").find().skip(offset).limit(size).toArray()
}

/**
 * Get the list of sightings between two dates for a trail
 *
 * @export
 * @async
 * @param {String} trailName - name of the trail to search over
 * @param {Date} start - start date (inclusive)
 * @param {Date} end - end date (inclusive)
 * @returns {Promise<Object[]>} - A promise for the array of matching sightings
 */
export async function getSightingsBetweenDatesOnTrail(trailName, start, end) {
    const query = {
        trailName: trailName,
        sightingTime: {
            $gte: start,
            $lte: end
        }
    }
    return db.collection("sightings").find(query).toArray()
}

/**
 * Find the trail name with the might animals sighted at once
 *
 * @export
 * @async
 * @returns {Promise<String>} - A promise for the name of trail with the most sightings
 */
export async function getTrailWithMostAnimals() {
    let sighting = await db.collection("sightings").find().sort({ animalCount: -1 }).limit(1)

    if (sighting) {
        return sighting.trailName
    } else {
        return Promise.reject("no sightings found")
    }
}

/**
 * Get a specific sighting by its ObjectId
 *
 * @export
 * @async
 * @param {ObjectId} id - mongoDB ObjectId of the sighting to get
 * @returns {Promise<ObjectId>} - A promise for the matching sighting
 */
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

/**
 * Get a specific sighting by the user ObjectId who made the sighting 
 *
 * @export
 * @async
 * @param {ObjectId} id - mongoDB ObjectId of the user
 * @returns {Promise<ObjectId>} - A promise for the matching sighting
 */
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


/**
 * Insert the provided sighting into the database
 *
 * @export
 * @async
 * @param {Object} sighting - the sighting to insert
 * @returns {Promise<InsertOneResult>} - The result of the insert operation
 */
export async function create(sighting) {
    // Clear _id from sighting to ensure the new sighting does not 
    // have an existing _id from the database, as we want a new _id
    // to be created and added to the sighting object.
    delete sighting.id

    // Insert the sighting document and implicitly add the new _id to sighting
    return db.collection("sightings").insertOne(sighting)
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<DeleteOneResult>}
 */
export async function deleteByID(id) {
    return db.collection("sightings").deleteOne({ _id: new ObjectId(id) })
}

/**
 * Insert the provided sightings into the database
 *
 * @export
 * @async
 * @param {Object[]} sightings - the sightings to insert
 * @returns {Promise<InsertOneResult>} - The result of the insert operation
 */
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


// TODO: Remove or refactor
export async function updateByIdAnimalCount(id, count) {
    // update the sighting count using $set operator
    // all other fields remain untouched.
    return db.collection("sightings").updateOne({ _id: new ObjectId(id) }, { $set: { animalCount: count } })
}

// TODO: Remove or refactor
export async function updateByIdAnimalSpecies(id, species) {
    // update the sighting species using $set operator
    // all other fields remain untouched.
    return db.collection("sightings").updateOne({ _id: new ObjectId(id) }, { $set: { animalSpecies: species } })
}