import { Router } from "express"
import { createUser, deleteUserById, getUserByAuthenticationKey, getUserById, updateUserById } from "../controllers/users.js"
import auth from "../middleware/auth.js"

const userRouter = Router()

/**
 * @openapi
 * /users:
 *  post:
 *      summary: Create User
 *      tags: [Users]
 *      security:
 *        - ApiKey: [] 
 *      requestBody:
 *          $ref: "#/components/requestBodies/NewUser"
 *      responses:
 *          200:
 *              $ref: "#/components/responses/200_UserObject"
 *          409:
 *              description: Email address already associated with another account.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                type: integer
 *                                example: 409
 *                              message:
 *                                type: string
 *                                example: "Email account already associated with another account."
 *          500:
 *              $ref: "#/components/responses/500_DatabaseError"
 */
userRouter.post("/", auth(["admin"]), createUser)

/**
 * @openapi
 * /users/{id}:
 *  get:
 *      summary: 'Get user by ID'
 *      tags: [Users]
 *      security:
 *        - ApiKey: []
 *      parameters:
 *        - name: id
 *          in: 'path'
 *          description: 'User ID'
 *          required: true
 *          schema:
 *            type: 'string'
 *      responses:
 *          200:
 *              $ref: "#/components/responses/200_UserObject"
 *          500:
 *              $ref: "#/components/responses/500_DatabaseError"
 */
userRouter.get("/:id", auth(["admin", "moderator", "spotter"]), getUserById)

/**
 * @openapi
 * /users/key/{authenticationKey}:
 *    get:
 *      summary: Get user by authentication key
 *      tags: [Users]
 *      parameters:
 *        - name: authenticationKey
 *          in: 'path'
 *          description: 'User authentication key'
 *          required: true
 *          schema:
 *              type: 'string'
 *      responses:
 *          200:
 *              $ref: "#/components/responses/200_UserObject"
 *          500:
 *              $ref: "#/components/responses/500_DatabaseError"
 */
userRouter.get("/key/:authenticationKey", getUserByAuthenticationKey)

/**
 * @openapi
 * /users:
 *  patch:
 *      summary: Update User
 *      tags: [Users]
 *      security:
 *        - ApiKey: []
 *      requestBody:
 *          description: Updated user object
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          email:
 *                              type: string
 *                              format: email
 *                              example: updatedUser@test.com
 *                          password:
 *                              type: string
 *                              format: password
 *                              example: UpdatedPassword123!
 *                          role:
 *                              type: string
 *                              enum:
 *                                - spotter
 *                                - admin
 *                                - moderator
 *                          authenticationKey:
 *                              type: string
 *                              nullable: true
 *                              example: ""
 *      responses:
 *          200:
 *              $ref: "#/components/responses/200_UserObject"
 *          500:
 *              $ref: "#/components/responses/500_DatabaseError"
 */
userRouter.patch("/", auth(["admin", "moderator", "spotter"]), updateUserById)

/**
 * @openapi
 * /users/{id}:
 *  delete:
 *      summary: Delete User
 *      tags: [Users]
 *      security:
 *        - ApiKey: []
 *      parameters:
 *          - name: id
 *            in: 'path'
 *            description: 'User ID'
 *            required: true
 *            schema:
 *               type: 'string'
 *      responses:
 *          200:
 *              description: User sucessfully deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 200
 *                              message:
 *                                  type: string
 *                                  example: "User successfully deleted"
 *          500:
 *              $ref: "#/components/responses/500_DatabaseError"
 */
userRouter.delete("/:id", auth(["admin"], deleteUserById))

export default userRouter
