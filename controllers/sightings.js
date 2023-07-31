// TODO: Update to have endpoints that match new model
// TODO: Write swagger documentation comments
import { Router } from "express";
import * as Sightings from "../models/sighting.js";
import auth from "../middleware/auth.js";

const sightingController = Router()

sightingController.get("/sightings/all", async (req, res) => {
    // #swagger.summary = 'Get a collection of all sightings'

    const sightings = await Sightings.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all sightings",
        sightings: sightings,
    })
})

sightingController.get("/sightings/:page", async (req, res) => {
    // #swagger.summary = 'Get a collection of sightings in pages'
    const pageSize = 5;
    const page = parseInt(req.params.page);

    const sightings = await Sightings.getByPage(page, pageSize);

    res.status(200).json({
        status: 200,
        message: "Get paginated sightings on page " + page,
        sightings: sightings,
    })
})

sightingController.get("/sightings/:id", (req, res) => {
    // #swagger.summary = 'Get a specific sighting by ID'
    const sightingID = req.params.id

    Sightings.getById(sightingID).then(sighting => {
        res.status(200).json({
            status: 200,
            message: "Get sighting by ID",
            sighting: sighting
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get sighting by ID",
        })
    })
})

sightingController.post("/sightings/", [
    auth(["admin", "moderator", "spotter"]),
], (req, res) => {
    // #swagger.summary = 'Create a specific sighting'
    // Get the sighting data out of the request
    const sightingData = req.body

    // Convert the sighting data into an Sighting model object
    const sighting = Sighting(
        null,
        sightingData.userId,
        sightingData.trailName,
        sightingData.animalName,
        sightingData.animalCount,
        sightingData.animalSpecies,
        sightingData.sightingTime
    )

    // Use the create model function to insert this sighting into the DB
    Sightings.create(sighting).then(sighting => {
        res.status(200).json({
            status: 200,
            message: "Created sighting",
            sighting: sighting,
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Failed to created sighting",
        })
    })
})

sightingController.delete("/sightings/", [
    auth(["admin", "moderator", "spotter"]),
], (req, res) => {
    // #swagger.summary = 'Delete a specific sighting by id'
    const sightingID = req.body.id

    // TODO: If the role is spotter then we should also check that
    // the sighting they are deleting was created by them.

    res.status(200).json({
        status: 200,
        message: "Delete sighting by ID - Not yet implemented",
    })
})
//// End delete sighting by ID

export default sightingController