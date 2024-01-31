import { Router } from "express"
import { getUserById } from "../controllers/users.js"

const userRouter = Router()

/**
 * @openapi
 * /users/{id}:
 *      get:
 *          summary: 'Get user by ID'
 *          tags: [Users]
 *          security:
 *              - ApiKey: []
 *          parameters:
 *              - name: id
 *                in: 'path'
 *                description: 'User ID'
 *                required: true
 *                schema:
 *                  type: 'string'
 *          responses:
 *            '200':
 *              description: 'Response object with user'
 *              content:
 *                application/json:
 *                  schema:
 *                    type: 'object'
 *                    properties:
 *                      status:
 *                        type: 'number'
 *                      message:
 *                        type: 'string'
 *                      user:
 *                        type: 'object'
 *                        properties:
 *                          _id:
 *                              type: 'string'
 *                          email:
 *                              type: 'string'
 *                          password:
 *                              type: 'string'
 *                          role:
 *                              type: 'string'
 *                              enum:
 *                                  - 'spotter'
 *                                  - 'moderator'
 *                                  - 'admin'
 */
userRouter.get("/:id", getUserById)

export default userRouter
