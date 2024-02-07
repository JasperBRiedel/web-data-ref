import { Router } from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/auth.js"

const authRouter = Router()

/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: 'Attempt username and password based authentication'
 *    tags: [Authentication]
 *    requestBody:
 *      description: 'Attempt user login with email and password'
 *      content:
 *        application/json:
 *          schema:
 *            type: 'object'
 *            properties:
 *              email:
 *                type: 'string'
 *                example: 'test@test.com'
 *              password:
 *                type: 'string'
 *                example: 'StrongPassword123!'
 *    responses:
 *      200:
 *        description: 'Login successful'
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                status:
 *                  type: 'number'
 *                  example: 200
 *                message:
 *                  type: 'string'
 *                  example: "Successfully logged in"
 *                authenticationKey:
 *                  type: 'string'
 *      401:
 *        description: 'Invalid credentials'
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                status:
 *                  type: 'number'
 *                message:
 *                  type: 'string'
 *              example:
 *                status: 400
 *                message: "Invalid credentials"
 *      500:
 *        description: 'Database error'
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                status:
 *                  type: 'number'
 *                message:
 *                  type: 'string'
 *              example:
 *                status: 500
 *                message: "Error processing request"
 */
authRouter.post("/login", loginUser)

/**
 * @openapi
 * /auth/register:
 *  post:
 *    summary: Register a new user
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: 'test@test.com'
 *              password:
 *                type: string
 *                format: password
 *                example: StrongPassword123!
 *    responses:
 *      200:
 *        description: User successfully registered
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: "User successfully registered"
 *                user:
 *                  type: object
 *                  properties:
 *                    _id: 
 *                      type: string
 *                      example: 65b9f355ff2ee2cc6c66a291
 *                    email:
 *                      type: string
 *                      format: email
 *                      example: test@test.com
 *                    password:
 *                      type: string
 *                      format: password
 *                    role:
 *                      type: string
 *                      enum:
 *                        - spotter
 *                        - admin
 *                        - moderator
 *                    authenticationKey:
 *                      type: string
 *                      nullable: true
 *                      example: ""
 *      409:
 *        description: Email address already associated with another account.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 409
 *                message:
 *                  type: string
 *                  example: "Email account already associated with another account."
 *      500:
 *        description: 'Database error'
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                status:
 *                  type: 'number'
 *                message:
 *                  type: 'string'
 *              example:
 *                status: 500
 *                message: "Error processing request"
 */
authRouter.post("/register", registerUser)

/**
 * @openapi
 * /auth/logout:
 *  post:
 *    summary: Logs the current user out
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              authenticationKey:
 *                type: string
 *    responses:
 *      200:
 *        description: User successfully logged out
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: "User successfully logged out."
 *      500:
 *        description: 'Database error'
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                status:
 *                  type: 'number'
 *                message:
 *                  type: 'string'
 *              example:
 *                status: 500
 *                message: "Error processing request"
 */
authRouter.post("/logout", logoutUser)

export default authRouter
