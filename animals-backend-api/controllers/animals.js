import { Router } from "express";

const animalController = Router()

animalController.get("/animals", (req, res) => {
    // #swagger.summary = 'Get a collection of all animals'
    res.status(200).json({
        status: 200,
        message: "Get all animals - Not yet implemented",
        animals: []
    })
})

animalController.get("/animals/:name", (req, res) => {
    // #swagger.summary = 'Get a specific animal by name'
    const animalName = req.params.name

    res.status(200).json({
        status: 200,
        message: "Get animal by name - Not yet implemented",
        animal: {},
    })
})

animalController.put("/animals/:name", (req, res) => {
    // #swagger.summary = 'Create a specific animal by name'
    const animalName = req.params.name

    res.status(200).json({
        status: 200,
        message: "Create animal by name - Not yet implemented",
    })
})

animalController.patch("/animals/:name", (req, res) => {
    // #swagger.summary = 'Update a specific animal by name'
    const animalName = req.params.name
    const animalRecord = req.body

    res.status(200).json({
        status: 200,
        message: "Update animal by name - Not yet implemented",
    })
})

animalController.delete("/animals/:name", (req, res) => {
    // #swagger.summary = 'Delete a specific animal by name'
    const animalName = req.params.name

    res.status(200).json({
        status: 200,
        message: "Delete animal by name - Not yet implemented",
    })
})

export default animalController