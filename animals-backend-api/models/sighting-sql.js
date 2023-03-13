import { db } from "../database/mysql.js";
import { Sighting } from "./sighting.js";

export async function getAll() {
    // Get the collection of all sightings
    const [allSightingsResults] = await db.query("SELECT * FROM sightings")
    // Convert the collection of results into a list of Sighting objects
    return await allSightingsResults.map((sightingResult) =>
        Sighting(
            sightingResult.id,
            sightingResult.trail_id,
            sightingResult.animal_id,
            sightingResult.user_id,
            sightingResult.date,
            sightingResult.time
        ))
}

export async function getTop(amount) {
    // Get the collection of all sightings
    const [allSightingsResults] = await db.query(
        "SELECT * FROM sightings ORDER BY date DESC, time DESC LIMIT ?",
        [amount]
    )
    // Convert the collection of results into a list of Sighting objects
    return await allSightingsResults.map((sightingResult) =>
        Sighting(
            sightingResult.id,
            sightingResult.trail_id,
            sightingResult.animal_id,
            sightingResult.user_id,
            sightingResult.date,
            sightingResult.time
        ))
}

export async function getByID(sightingID) {
    // Get the collection of all sightings with matching ID
    const [sightingsResults] = await db.query(
        "SELECT * FROM sightings WHERE id = ?", sightingID
    )
    // Convert the result into a Sighting object
    if (sightingsResults.length > 0) {
        const sightingResult = sightingsResults[0];
        return Promise.resolve(
            Sighting(
                sightingResult.id,
                sightingResult.trail_id,
                sightingResult.animal_id,
                sightingResult.user_id,
                sightingResult.date,
                sightingResult.time
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByUserID(userID) {
    // Get the collection of all sightings with matching userID
    const [sightingsResults] = await db.query(
        "SELECT * FROM sightings WHERE user_id = ?", userID
    )
    // Convert the result into a Sighting object
    return await sightingsResults.map((sightingResult) =>
        Sighting(
            sightingResult.id,
            sightingResult.trail_id,
            sightingResult.animal_id,
            sightingResult.user_id,
            sightingResult.date,
            sightingResult.time
        ))
}

export async function create(sighting) {
    // New sightings should not have existing IDs, delete just to be sure.
    delete sighting.id
    // Insert sighting object and return resulting promise
    return db.query(
        "INSERT INTO sightings (trail_id, animal_id, user_id, date, time) " +
        "VALUES (?, ?, ?, ?, ?)",
        [sighting.trail_id, sighting.animal_id, sighting.user_id, sighting.date, sighting.time]
    ).then(([result]) => {
        // Inject the inserted ID into the sighting object and return
        return { ...sighting, id: result.insertId }
    })
}

export async function update(sighting) {
    return db.query(
        "UPDATE sightings SET name = ? WHERE id = ?",
        [sighting.name, sighting.id]
    )
}

export async function deleteByID(sightingID) {
    return db.query("DELETE FROM sightings WHERE id = ?", sightingID)
}