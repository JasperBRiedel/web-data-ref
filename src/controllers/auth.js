import bcrypt from "bcryptjs"
import { v4 as uuid4 } from "uuid"
import * as Users from "../models/user.js";

/**
 * Controller for: POST /auth/login
 * @param {Request} req The Request Object
 * @param {Response} res The Response Object
 */
export async function loginUser(req, res) {
    // access request body
    let loginData = req.body

    // Find user by email
    Users.getByEmail(loginData.email)
        .then(user => {
            // Check passwords match
            if (bcrypt.compareSync(loginData.password, user.password)) {
                // Generate new api key
                user.authenticationKey = uuid4().toString()

                // Update user record with new api key
                Users.update(user).then(result => {
                    res.status(200).json({
                        status: 200,
                        message: "user logged in",
                        authenticationKey: user.authenticationKey,
                    })
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "invalid credentials"
                })

            }
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: 500,
                message: "login failed"
            })
        })

    // ES6
    // try {
    //     const { email, password } = req.body;

    //     const user = await Users.getByEmail(email)

    //     if (!user) return res.status(404).json({
    //         status: 404,
    //         message: "User not found."
    //     })

    //     const isCorrectPassword = bcrypt.compareSync(password, user.password)
    //     if (!isCorrectPassword) return res.status(400).json({
    //         status: 400,
    //         message: "Invalid credentials"
    //     })

    //     user.authenticationKey = uuid4().toString()

    //     await Users.update(user)

    //     res.status(200).json({
    //         status: 200,
    //         message: "User logged in",
    //         authenticationKey: user.authenticationKey
    //     })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({
    //         status: 500,
    //         message: "Login failed."
    //     })
    // }
}

/**
 * Controller for: POST /auth/logout
 * @param {Request} req The Request Object
 * @param {Response} res The Response Object
 */
export function logoutUser(req, res) {
    const authenticationKey = req.body.authenticationKey
    Users.getByAuthenticationKey(authenticationKey)
        .then(user => {
            user.authenticationKey = null
            Users.update(user).then(user => {
                res.status(200).json({
                    status: 200,
                    message: "user logged out"
                })
            })
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: "failed to logout user"
            })
        })
}


/**
 * Controller for: POST /auth/register
 * @param {Request} req The Request Object
 * @param {Response} res The Response Object
 */
export async function registerUser(req, res) {
    // Get the user data out of the request
    const userData = req.body

    // TODO: check if user with email already exists
    const userAlreadyExists = await Users.getByEmail(userData.email)

    if(userAlreadyExists) {
        res.status(409).json({
            status: 409,
            message: "Conflict: the provided email address is already associated with an account."
        })
        return; 
    }


    // hash the password 
    userData.password = bcrypt.hashSync(userData.password);


    // Convert the user data into an User model object
    const user = Users.User(
        null,
        userData.email,
        userData.password,
        "spotter",
        null
    )

    // Use the create model function to insert this user into the DB
    Users.create(user).then(_ => {
        res.status(200).json({
            status: 200,
            message: "Registration successful",
            user: user
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Registration failed",
        })
    })
}