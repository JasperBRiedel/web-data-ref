// TODO: Update with new endpoints for new model functions
// TODO: Can probably remove schema validation?
import { Router } from "express";

import { validate } from "../middleware/validator.js";

import models from "../models/model-switcher.js"
import { Sighting } from "../models/sighting.js";
import auth from "../middleware/auth.js";

const sightingController = Router()

//// Get sighting list endpoint
const getSightingListSchema = {
    type: "object",
    properties: {}
}

sightingController.get("/sightings", validate({ body: getSightingListSchema }), async (req, res) => {
    // #swagger.summary = 'Get a collection of all sightings'

    const sightings = await models.sightingModel.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all sightings",
        sightings: sightings,
    })
})
//// End get sighting list endpoint

//// Get paginated sighting list endpoint
const getPaginatedSightingListSchema = {
    type: "object",
    required: ["page"],
    properties: {
        page: {
            type: "integer",
            minimum: 0,
        }
    }
}

sightingController.get("/sightings/paged/:page",
    validate({ params: getPaginatedSightingListSchema }),
    async (req, res) => {
        // #swagger.summary = 'Get a collection of sightings in pages'
        const pageSize = 5;
        const page = parseInt(req.params.page);

        const sightings = await models.sightingModel.getByPage(page, pageSize);

        res.status(200).json({
            status: 200,
            message: "Get paginated sightings on page " + page,
            sightings: sightings,
        })
    })
//// End get paginated sighting list endpoint

//// Get top sightings list endpoint
const getTopSightingsListSchema = {
    type: "object",
    required: ["amount"],
    properties: {
        amount: {
            type: "string",
            pattern: "^[0-9]+$"
        }
    }
}

sightingController.get(
    "/sightings/top/:amount",
    validate({ params: getTopSightingsListSchema }),
    async (req, res) => {
        // #swagger.summary = 'Get a collection of top sightings'
        const amount = parseInt(req.params.amount)

        const sightings = await models.sightingModel.getTop(amount)

        res.status(200).json({
            status: 200,
            message: "Get top sightings",
            sightings: sightings,
        })
    })
//// End get top sightings list endpoint

//// Get sightings by user ID endpoint
const getSightingByUserIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

sightingController.get(
    "/sightings/user-id/:id",
    validate({ params: getSightingByUserIDSchema }),
    async (req, res) => {
        // #swagger.summary = 'Get all sightings by a user ID'
        const userID = req.params.id

        const sightings = await models.sightingModel.getByUserID(userID)

        res.status(200).json({
            status: 200,
            message: "Get all sightings by user ID",
            sightings: sightings,
        })
    })
//// End get sightings by user ID endpoint

//// Get sighting by ID endpoint
const getSightingByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

sightingController.get("/sightings/:id", validate({ params: getSightingByIDSchema }), (req, res) => {
    // #swagger.summary = 'Get a specific sighting by ID'
    const sightingID = req.params.id

    models.sightingModel.getByID(sightingID).then(sighting => {
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
//// End get sighting by ID endpoint

//// Create sighting endpoint
const createSightingSchema = {
    type: "object",
    required: ["trail_id", "animal_id", "user_id", "date", "time"],
    properties: {
        trail_id: {
            type: "string"
        },
        animal_id: {
            type: "string"
        },
        user_id: {
            type: "string"
        },
        date: {
            type: "string"
        },
        time: {
            type: "string"
        },
    }
}

sightingController.post("/sightings/", [
    auth(["admin", "moderator", "spotter"]),
    validate({ body: createSightingSchema })
], (req, res) => {
    // #swagger.summary = 'Create a specific sighting'
    // Get the sighting data out of the request
    const sightingData = req.body

    // Convert the sighting data into an Sighting model object
    const sighting = Sighting(
        null,
        sightingData.trail_id,
        sightingData.animal_id,
        sightingData.user_id,
        sightingData.date,
        sightingData.time
    )

    // Use the create model function to insert this sighting into the DB
    models.sightingModel.create(sighting).then(sighting => {
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
//// End create sighting endpoint

//// Delete sighting by ID
const deleteSightingSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
    }
}

sightingController.delete("/sightings/", [
    auth(["admin", "moderator", "spotter"]),
    validate({ body: deleteSightingSchema })
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