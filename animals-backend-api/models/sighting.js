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