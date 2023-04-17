import { ObjectId } from "mongodb"
import { Trail } from "./trail.js"

export async function getAll() {
    let allTrailsResults = await db.collection("trails").find().toArray()

    return Promise.resolve(
        allTrailsResults.map((trailResult) =>
            Trail(trailResult._id.toString(), trailResult.name))
    )
}

export async function getByID(trailID) {
    let trailResult = await db.collection("trails").findOne({ _id: new ObjectId(trailID) })
    if (trailResult) {
        return Promise.resolve(
            Trail(trailResult._id.toString(), trailResult.name)
        )
    } else {
        return Promise.reject("no result found")
    }
}


export async function create(trail) {
    delete trail.id

    let result = await db.collection("trails").insertOne(trail)

    // Rebuild the trail object with the inserted ID
    return Promise.resolve({ ...result, id: result.insertedId.toString() })
}


export async function update(trail) {
    const trailID = new ObjectId(trail.id)
    delete trail.id

    const trailUpdateDocument = {
        "$set": trail
    }

    return db.collection("trails").updateOne({ _id: trailID }, trailUpdateDocument)
}


export async function deleteByID(trailID) {
    return db.collection("trails").deleteOne({ _id: new ObjectId(trailID) })
}