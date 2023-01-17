import { Router } from "express";

const animalController = Router()

animalController.get("/animals", (req, res) => {
    // #swagger.summary = 'Get a collection of all animals'
    res.status(200).json({ status: 200, message: "Not yet implemented" })
})

animalController.get("/animals/:name", (req, res) => {
    // #swagger.summary = 'Get a specific animal by name'
    const animalName = req.params.name

    res.status(200).json({ status: 200, message: "Not yet implemented" })
})

animalController.put("/animals/:name", (req, res) => {
    // #swagger.summary = 'Create a specific animal by name'
    const animalName = req.params.name

    res.status(200).json({ status: 200, message: "Not yet implemented" })
})

animalController.patch("/animals/:name", (req, res) => {
    // #swagger.summary = 'Update a specific animal by name'
    const animalName = req.params.name
    const animalRecord = req.body

    res.status(200).json({ status: 200, message: "Not yet implemented" })
})

animalController.delete("/animals/:name", (req, res) => {
    // #swagger.summary = 'Delete a specific animal by name'
    const animalName = req.params.name

    res.status(200).json({ status: 200, message: "Not yet implemented" })
})

export default animalController