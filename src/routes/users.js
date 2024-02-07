import { Router } from "express"
import { createUser, deleteUserById, getUserByAuthenticationKey, getUserById, updateUserById } from "../controllers/users.js"
import auth from "../middleware/auth.js"

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
userRouter.get("/:id", auth(["admin", "moderator", "spotter"]), getUserById)

userRouter.get("/key/:authenticationKey", getUserByAuthenticationKey)

userRouter.post("/", auth(["admin"]), createUser)

// ? possibly switch from id in body to /:id param
userRouter.patch("/",auth(["admin", "moderator", "spotter"]), updateUserById)

userRouter.delete("/:id", auth(["admin"], deleteUserById))

export default userRouter
