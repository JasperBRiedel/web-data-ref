import { Router } from "express"

const users = Router()

/**
 * @openapi
 * /users/login:
 *      post:
 *          summary: 'Attempt username and password based authentication'
 *          requestBody:
 *            description: 'Attempt user login with email and password'
 *            content:
 *              application/json:
 *                schema:
 *                  type: 'object'
 *                  properties:
 *                    email:
 *                      type: 'string'
 *                    password:
 *                      type: 'string'
 *                example:
 *                  email: 'user@server.com'
 *                  password: 'abc123'
 *          responses:
 *            '200':
 *              description: 'Login successful'
 *              content:
 *                application/json:
 *                  schema:
 *                    type: 'object'
 *                    properties:
 *                      status:
 *                        type: 'number'
 *                      message:
 *                        type: 'string'
 *                      authenticationKey:
 *                        type: 'string'
 *            '400':
 *              description: 'Invalid credentials'
 *              content:
 *                application/json:
 *                  schema:
 *                    type: 'object'
 *                    properties:
 *                      status:
 *                        type: 'number'
 *                      message:
 *                        type: 'string'
 *            '500':
 *              description: 'Database error'
 *              content:
 *                application/json:
 *                  schema:
 *                    type: 'object'
 *                    properties:
 *                      status:
 *                        type: 'number'
 *                      message:
 *                        type: 'string'
 */
users.post("/users/login", (req, res) => {
    res.status(500).json({
        status: 500,
        message: "User model not yet connected",
    })
})

/**
 * @openapi
 * /users/{id}:
 *      get:
 *          summary: 'Get user by ID'
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
users.get("/users/:id", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "User found",
        user: {
            _id: "",
            email: "",
            password: "",
            role: "spotter",
        },
    })
})

export default users
