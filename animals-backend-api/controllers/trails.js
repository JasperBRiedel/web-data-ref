import { Router } from "express";
import { validate } from "../middleware/validator.js";
import models from "../models/model-switcher.js"
import xml2js from "xml2js"
import { Trail } from "../models/trail.js";

const trailController = Router()

//// Get trail list endpoint
const getTrailListSchema = {
    type: "object",
    properties: {}
}

trailController.get("/trails", validate({ body: getTrailListSchema }), async (req, res) => {
    // #swagger.summary = 'Get a collection of all trails'

    const trails = await models.trailModel.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all trails",
        trails: trails,
    })
})
//// End get trail list endpoint

//// Get trail by ID endpoint
const getTrailByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

trailController.get("/trails/:id", validate({ params: getTrailByIDSchema }), (req, res) => {
    // #swagger.summary = 'Get a specific trail by ID'
    const trailID = req.params.id

    models.trailModel.getByID(trailID).then(trail => {
        res.status(200).json({
            status: 200,
            message: "Get trail by ID",
            trail: trail
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get trail by ID",
        })
    })
})
//// End get trail by ID endpoint

trailController.post("/trails/upload/xml", (req, res) => {
    if (req.files && req.files["xml-file"]) {
        // Access the XML file as a string
        const XMLFile = req.files["xml-file"]
        const file_text = XMLFile.data.toString()

        // Set up XML parser
        const parser = new xml2js.Parser();
        parser.parseStringPromise(file_text)
            .then(data => {
                const trailUpload = data["trail-upload"]
                const trailUploadAttributes = trailUpload["$"]
                const operation = trailUploadAttributes["operation"]
                // Slightly painful indexing to reach nested children
                const trailsData = trailUpload["trails"][0].trail

                if (operation == "insert") {
                    Promise.all(trailsData.map((trailData) => {
                        // Convert the xml object into a model object
                        const trailModel = Trail(null, trailData.name.toString())
                        // Return the promise of each creation query
                        return models.trailModel.create(trailModel)
                    })).then(results => {
                        res.status(200).json({
                            status: 200,
                            message: "XML Upload insert successful",
                        })
                    }).catch(error => {
                        res.status(500).json({
                            status: 500,
                            message: "XML upload failed on database operation - " + error,
                        })
                    })
                } else if (operation == "update") {
                    Promise.all(trailsData.map((trailData) => {
                        // Convert the xml object into a model object
                        const trailModel = Trail(
                            trailData.id.toString(),
                            trailData.name.toString()
                        )
                        // Return the promise of each creation query
                        return models.trailModel.update(trailModel)
                    })).then(results => {
                        res.status(200).json({
                            status: 200,
                            message: "XML Upload update successful",
                        })
                    }).catch(error => {
                        res.status(500).json({
                            status: 500,
                            message: "XML upload failed on database operation - " + error,
                        })
                    })

                } else {
                    res.status(400).json({
                        status: 400,
                        message: "XML Contains invalid operation element value",
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Error parsing XML - " + error,
                })
            })


    } else {
        res.status(400).json({
            status: 400,
            message: "No file selected",
        })
    }
})

//// Create trail endpoint
const createTrailSchema = {
    type: "object",
    required: ["name"],
    properties: {
        name: {
            type: "string"
        },
    }
}

trailController.post("/trails/", validate({ body: createTrailSchema }), (req, res) => {
    // #swagger.summary = 'Create a specific trail'
    /* #swagger.requestBody = {
            description: 'Add a new trail',
            content: {
                'application/json': {
                    schema: {
                        name: 'string',
                    },
                    example: {
                        name: 'Mountain Trail',
                    }
                }
            }
            
        } 
    */
    // Get the trail data out of the request
    const trailData = req.body

    // Convert the trail data into an Trail model object
    const trail = Trail(null, trailData.name)

    // Use the create model function to insert this trail into the DB
    models.trailModel.create(trail).then(trail => {
        res.status(200).json({
            status: 200,
            message: "Created trail",
            trail: trail,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to created trail",
        })
    })
})
//// End create trail endpoint

//// Update trail by ID
const updateTrailSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
        name: {
            type: "string"
        }
    }
}

trailController.patch("/trails/", validate({ body: updateTrailSchema }), (req, res) => {
    // #swagger.summary = 'Update a specific trail by ID'
    const trail = req.body

    res.status(200).json({
        status: 200,
        message: "Update trail by ID - Not yet implemented",
    })
})
//// End update trail by ID

//// Delete trail by ID
const deleteTrailSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
    }
}

trailController.delete("/trails/", validate({ body: deleteTrailSchema }), (req, res) => {
    // #swagger.summary = 'Delete a specific trail by id'
    const trailID = req.body.id

    res.status(200).json({
        status: 200,
        message: "Delete trail by ID - Not yet implemented",
    })
})
//// End delete trail by ID

export default trailController