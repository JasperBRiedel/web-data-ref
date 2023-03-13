import { db } from "../database/mysql.js";
import { Trail } from "./trail.js";

export async function getAll() {
    // Get the collection of all trails
    const [allTrailsResults] = await db.query("SELECT * FROM trails")
    // Convert the collection of results into a list of Trail objects
    return await allTrailsResults.map((trailResult) =>
        Trail(trailResult.id, trailResult.name))
}

export async function getByID(trailID) {
    // Get the collection of all trails
    const [trailsResults] = await db.query(
        "SELECT * FROM trails WHERE id = ?", trailID
    )
    // Convert the result into a Trail object
    if (trailsResults.length > 0) {
        const trailResult = trailsResults[0];
        return Promise.resolve(
            Trail(trailResult.id, trailResult.name)
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function create(trail) {
    // New trails should not have existing IDs, delete just to be sure.
    delete trail.id
    // Insert trail object and return resulting promise
    return db.query(
        "INSERT INTO trails (name) VALUES (?",
        [trail.name]
    ).then(([result]) => {
        // Inject the inserted ID into the trail object and return
        return { ...trail, id: result.insertId }
    })
}

export async function update(trail) {
    return db.query(
        "UPDATE trails SET name = ? WHERE id = ?",
        [trail.name, trail.id]
    )
}

export async function deleteByID(trailID) {
    return db.query("DELETE FROM trails WHERE id = ?", trailID)
}