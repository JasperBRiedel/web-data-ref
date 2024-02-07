import * as Users from "../models/user.js"
import bcrypt from "bcryptjs"
import express from "express"

/**
 * Controller for: GET /users/:id
 * @param {express.Request} req The Request object
 * @param {express.Response} res The Response object
 */
export function getUserById(req, res) {
    const userId = req.params.id

    if (!userId) {
        res.status(400).json({
            status: 400,
            message: "Bad Request: User ID parameter required."
        })
        return;
    } 

    Users.getById(userId).then(foundUser => {
        res.status(200).json({
            status: 200,
            message: "User found",
            user: foundUser
        });
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Database error finding user.",
            error: error
        })
    })
}

/**
 * Controller for: GET /users/key/:authenticationKey
 * @param {express.Request} req The Request object
 * @param {express.Response} res The Response object
 */
export function getUserByAuthenticationKey(req, res) {
    const authenticationKey = req.params.authenticationKey

    Users.getByAuthenticationKey(authenticationKey).then(user => {
        res.status(200).json({
            status: 200,
            message: "Get user by authentication key",
            user: user,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get user by authentication key",
        })
    })
}


/**
 * Controller for: POST /users/
 * @param {express.Request} req The Request object
 * @param {express.Response} res The Response object
 */
export async function createUser(req, res) {
    // Get the user data out of the request
    const userData = req.body

    const userAlreadyExists = await Users.getByEmail(userData.email)

    if (userAlreadyExists) {
        res.status(409).json({
            status: 409,
            message: "The provided email address is already associated with an account."
        })
        return;
    }

    // hash the password if it isn't already hashed
    if (!userData.password.startsWith("$2a")) {
        userData.password = bcrypt.hashSync(userData.password);
    }

    // Convert the user data into an User model object
    const user = Users.User(
        null,
        userData.email,
        userData.password,
        userData.role,
        null
    )

    // Use the create model function to insert this user into the DB
    Users.create(user).then(user => {
        res.status(200).json({
            status: 200,
            message: "Created user",
            user: user
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to create user",
        })
    })
}

/**
 * Controller for: PATCH /users/
 * @param {express.Request} req The Request object
 * @param {express.Response} res The Response object
 */
export async function updateUserById(req, res) {
    // Get the user data out of the request
    //
    // Note - the user data being updated is encapsulated in a user
    // object to avoid ambiguity between the logged in user's
    // authentication key and the authentication key of the user
    // currently being updated.
    const userData = req.body
    
    const currentUserId = req.get("X-AUTH-KEY")
    const currentUser = await Users.getByAuthenticationKey(currentUserId)

    if (currentUser.role == "spotter" || currentUser.role == "moderator") {
        if (currentUser._id != foundUser._id) {
            res.status(403).json({
                status: 403,
                message: "You do not have permission to alter this account."
            })
            return;
        }
    }

    
    // hash the password if it isn't already hashed
    if (userData.password && !userData.password.startsWith("$2a")) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }
    
    // Convert the user data into a User model object
    const updatedUser = Users.User(
        userData._id,
        userData.email,
        userData.password,
        userData.role,
        userData.authenticationKey
    )

    // Use the update model function to update this user in the DB
    Users.update(updatedUser).then(user => {
        res.status(200).json({
            status: 200,
            message: "Updated user",
            user: user
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Failed to update user",
        })
    })
}

/**
 * Controller for: DELETE /users/:id
 * @param {express.Request} req The Request object
 * @param {express.Response} res The Response object
 */
export function deleteUserById(req, res) {
    const userID = req.params.id

    Users.deleteById(userID).then(result => {
        res.status(200).json({
            status: 200,
            message: "User deleted",
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to delete user",
        })
    })
}