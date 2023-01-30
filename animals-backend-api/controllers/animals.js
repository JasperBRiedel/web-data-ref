import { Router } from "express";

import { validate } from "../middleware/validator.js";

const animalController = Router()

//// Get animal list endpoint
const getAnimalListSchema = {
    type: "object",
    properties: {}
}

animalController.get("/animals", validate({ body: getAnimalListSchema }), (req, res) => {
    // #swagger.summary = 'Get a collection of all animals'
    res.status(200).json({
        status: 200,
        message: "Get all animals - Not yet implemented",
        animals: []
    })
})
//// End get animal list endpoint

//// Get animal by ID endpoint
const getAnimalByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern: "^[0-9]+$"
        }
    }
}

animalController.get("/animals/:id", validate({ params: getAnimalByIDSchema }), (req, res) => {
    // #swagger.summary = 'Get a specific animal by ID'
    const animalID = req.params.id

    res.status(200).json({
        status: 200,
        message: "Get animal by ID - Not yet implemented",
        animal: {},
    })
})
//// End get animal by ID endpoint

//// Create animal endpoint
const createAnimalSchema = {
    type: "object",
    required: ["name", "species"],
    properties: {
        name: {
            type: "string"
        },
        species: {
            type: "string"
        }
    }
}

animalController.post("/animals/", validate({ body: createAnimalSchema }), (req, res) => {
    // #swagger.summary = 'Create a specific animal'
    const animal = req.body

    res.status(200).json({
        status: 200,
        message: "Create animal - Not yet implemented",
    })
})
//// End create animal endpoint

//// Update animal by ID
const updateAnimalSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
        name: {
            type: "string"
        },
        species: {
            type: "string"
        }
    }
}

animalController.patch("/animals/", validate({ body: updateAnimalSchema }), (req, res) => {
    // #swagger.summary = 'Update a specific animal by ID'
    const animal = req.body

    res.status(200).json({
        status: 200,
        message: "Update animal by ID - Not yet implemented",
    })
})
//// End update animal by ID

//// Delete animal by ID
const deleteAnimalSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
    }
}

animalController.delete("/animals/", validate({ body: deleteAnimalSchema }), (req, res) => {
    // #swagger.summary = 'Delete a specific animal by name'
    const animalID = req.body.id

    res.status(200).json({
        status: 200,
        message: "Delete animal by name - Not yet implemented",
    })
})
//// End delete animal by ID

export default animalController