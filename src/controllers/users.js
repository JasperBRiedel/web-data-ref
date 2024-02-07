import * as Users from "../models/user.js"

/**
 * Controller for: GET /users/:id
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export function getUserById(req, res) {
    res.status(200).json({
        status: 200,
        message: "User found",
        user: {
            _id: "",
            email: "",
            password: "",
            role: "spotter",
        },
    });
}


/**
 * Controller for: GET /users/key/:authenticationKey
 * @param {Request} req The Request object
 * @param {Response} res The Response object
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
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export async function createUser(req, res) {
    // Get the user data out of the request
    const userData = req.body

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
 * Controller for: PATCH /users/:id
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export async function updateUserById(req, res) {
    // Get the user data out of the request
    //
    // Note - the user data being updated is encapsulated in a user
    // object to avoid ambiguity between the logged in user's
    // authentication key and the authentication key of the user
    // currently being updated.
    const userData = req.body

    // TODO: Enforce that moderators and spotters can only
    // update their own user records.  

    // hash the password if it isn't already hashed
    if (userData.password && !userData.password.startsWith("$2a")) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Convert the user data into a User model object
    const user = Users.User(
        userData.id,
        userData.email,
        userData.password,
        userData.role,
        userData.authenticationKey
    )

    // Use the update model function to update this user in the DB
    Users.update(user).then(user => {
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
 * @param {Request} req The Request object
 * @param {Response} res The Response object
 */
export function deleteUserById(req, res) {
    const userID = req.params.id

    Users.deleteByID(userID).then(result => {
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