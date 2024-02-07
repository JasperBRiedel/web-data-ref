import { Router } from "express";
import { createNewSighting, deleteSightingById, getAllSightings, getSightingById, getSightingsByPage } from "../controllers/sightings.js";
import auth from "../middleware/auth.js";

const sightingsRouter = Router()

/**
 * @openapi
 * /sightings:
 *    get:
 *      summary: Get all sightings
 *      tags: [Sightings]
 *      responses:
 *        200:
 *          description: Response object with sightings array
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: integer
 *                    example: 200
 *                  message:
 *                    type: string
 *                    example: Get all sightings
 *                  sightings:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/AnimalSighting"
 */
sightingsRouter.get("/", getAllSightings)

/**
 * @openapi
 * /sightings:
 *    post:
 *      summary: Add new sighting
 *      tags: [Sightings]
 *      security:
 *        - ApiKey: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/NewAnimalSighting"
 *      responses:
 *        200:
 *          description: Sighting successfully created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 status:
 *                   type: 'number'
 *                 message:
 *                   type: 'string'
 *                 sighting:
 *                    $ref: "#/components/schemas/AnimalSighting"
 */
sightingsRouter.post("/", auth(["admin", "moderator", "spotter"]), createNewSighting)

/**
 * @openapi
 * /sightings:
 *    delete:
 *      summary: Deletes a sighting
 *      tags: [Sightings]
 *      security:
 *        - ApiKey: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *      responses:
 *        200:
 *          description: Sighting successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: integer
 *                    example: 200
 *                  message:
 *                    type: string
 *                    example: "Sighting successfully deleted"
 */
sightingsRouter.delete("/", auth(["admin", "moderator", "spotter"]), deleteSightingById)

/**
 * @openapi
 * /sightings/{id}:
 *    get:
 *      summary: Get Sightings by ID
 *      tags: [Sightings]
 *      parameters:
 *        - name: id
 *          in: path  
 *          description: Sighting ID
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Response object with sighting
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: integer
 *                    example: 200
 *                  message:
 *                    type: string
 *                    example: Get sighting by ID
 *                  sightings:
 *                     $ref: "#/components/schemas/AnimalSighting"
 */
sightingsRouter.get("/:id", getSightingById)

// TODO: switch over to query strings
/**
 * @openapi
 * /sightings/{page}:
 *    get:
 *      summary: Get Sightings by Page
 *      tags: [Sightings]
 *      parameters:
 *        - name: page
 *          in: path  
 *          description: Page number
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Response object with sightings array
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: integer
 *                    example: 200
 *                  message:
 *                    type: string
 *                    example: Get sightings by page
 *                  sightings:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/AnimalSighting"
 */
sightingsRouter.get("/:page", getSightingsByPage)


export default sightingsRouter