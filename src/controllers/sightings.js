import * as Sightings from "../models/sighting.js"
import * as Users from "../models/user.js"

/**
 * Controller for: GET /sightings
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export async function getAllSightings(req, res) {
    const sightings = await Sightings.getAll();

    res.status(200).json({
        status: 200,
        message: "Get all sightings",
        sightings: sightings,
    })
}

/**
 * Controller for: GET /sightings/:id
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export async function getSightingById(req, res) {
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
}


// TODO: swap params for query strings 
/**
 * Controller for: GET /sightings/:page
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export async function getSightingsByPage(req, res) {
    const pageSize = 5;
    const page = parseInt(req.params.page);
    console.log(page)

    const sightings = await Sightings.getByPage(page, pageSize);

    res.status(200).json({
        status: 200,
        message: "Get paginated sightings on page " + page,
        sightings: sightings,
    })
}


/**
 * Controller for: POST /sightings
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export async function createNewSighting(req, res) {
    // Get the sighting data out of the request
    const sightingData = req.body

    // Convert the sighting data into an Sighting model object
    const sighting = Sightings.Sighting(
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
}


/**
 * Controller for: DELETE /sightings
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export async function deleteSightingById(req, res) {
    const sightingID = req.body.id

    // If the role is spotter then we should also check that
    // the sighting they are deleting was created by them.
    const authenticationKey = req.get("X-AUTH-KEY")
    const currentUser = await Users.getByAuthenticationKey(authenticationKey)    

    if (currentUser.role == "spotter") {
        const sighting = await Sightings.getById(sightingID)
        const userId = currentUser._id.toString()
        const sightingUserId = sighting.userId.toString();
        
        if (userId != sightingUserId) {
            res.status(403).json({
                status: 403,
                message: "Not your sighting to delete."
            })
            return
        }
    }

    const deletedSighting = await Sightings.deleteByID(sightingID)
    
    res.status(200).json({
        status: 200,
        message: "Sighting successfully deleted.",
        sighting: deletedSighting
    })
}