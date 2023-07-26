// TODO: Update with new endpoints for new model functions
// TODO: Can probably remove schema validation?
import { Router } from "express";
import bcrypt from "bcryptjs"
import { v4 as uuid4 } from "uuid"
import { validate } from "../middleware/validator.js";
import { User } from "../models/user.js";
import models from "../models/model-switcher.js"
import auth from "../middleware/auth.js";

const userController = Router()


//// User login endpoint
const postUserLoginSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string"
        },
        password: {
            type: "string"
        }
    }
}

userController.post("/users/login",
    validate({ body: postUserLoginSchema }),
    (req, res) => {
        // access request body
        let loginData = req.body

        models.userModel.getByEmail(loginData.email)
            .then(user => {
                if (bcrypt.compareSync(loginData.password, user.password)) {
                    user.authenticationKey = uuid4().toString()

                    models.userModel.update(user).then(result => {
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
                res.status(500).json({
                    status: 500,
                    message: "login failed"
                })
            })
    }
)

//// User logout endpoint
const postUserLogoutSchema = {
    type: "object",
    required: ["authenticationKey"],
    properties: {
        authenticationKey: {
            type: "string"
        }
    }
}

userController.post("/users/logout",
    validate({ body: postUserLogoutSchema }),
    (req, res) => {
        const authenticationKey = req.body.authenticationKey
        models.userModel.getByAuthenticationKey(authenticationKey)
            .then(user => {
                user.authenticationKey = null
                models.userModel.update(user).then(user => {
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
)


//// Get user list endpoint
const getUserListSchema = {
    type: "object",
    properties: {}
}

userController.get("/users", [
    auth(["admin"]),
    validate({ body: getUserListSchema }),
], async (req, res) => {

    const users = await models.userModel.getAll()

    res.status(200).json({
        status: 200,
        message: "User list",
        users: users,
    })
}
)

//// Get user by ID endpoint
const getUserByIDSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string",
        }
    }
}

userController.get("/users/:id", [
    auth(["admin", "moderator", "spotter"]),
    validate({ params: getUserByIDSchema })
], (req, res) => {
    const userID = req.params.id

    // TODO: Enforce that moderator and spotter users
    // can only get them selves. 

    models.userModel.getByID(userID).then(user => {
        res.status(200).json({
            status: 200,
            message: "Get user by ID",
            user: user,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get user by ID",
        })
    })
}
)

//// Get user by authentication key endpoint
const getUserByAuthenticationKeySchema = {
    type: "object",
    required: ["authenticationKey"],
    properties: {
        authenticationKey: {
            type: "string",
        }
    }
}

userController.get("/users/by-key/:authenticationKey",
    validate({ params: getUserByAuthenticationKeySchema }),
    (req, res) => {
        const authenticationKey = req.params.authenticationKey

        models.userModel.getByAuthenticationKey(authenticationKey).then(user => {
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
)

//// Create user endpoint
const createUserSchema = {
    type: "object",
    required: [],
    properties: {
        user: {
            type: "object",
            required: [
                "email",
                "password",
                "role",
                "firstName",
                "lastName",
            ],
            properties: {
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                role: {
                    type: "string"
                },
                firstName: {
                    type: "string"
                },
                lastName: {
                    type: "string"
                },
            }
        }
    }
}

userController.post("/users", [
    auth(["admin"]),
    validate({ body: createUserSchema })
], (req, res) => {
    // Get the user data out of the request
    const userData = req.body.user

    // hash the password if it isn't already hashed
    if (!userData.password.startsWith("$2a")) {
        userData.password = bcrypt.hashSync(userData.password);
    }

    // Convert the user data into an User model object
    const user = User(
        null,
        userData.email,
        userData.password,
        userData.role,
        userData.firstName,
        userData.lastName,
        null
    )

    // Use the create model function to insert this user into the DB
    models.userModel.create(user).then(user => {
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
)

//// Register user endpoint
const registerUserSchema = {
    type: "object",
    required: [
        "email",
        "password",
        "firstName",
        "lastName",
    ],
    properties: {
        email: {
            type: "string"
        },
        password: {
            type: "string"
        },
        firstName: {
            type: "string"
        },
        lastName: {
            type: "string"
        },
    }
}
userController.post(
    "/users/register",
    validate({ body: registerUserSchema }),
    (req, res) => {
        // Get the user data out of the request
        const userData = req.body

        // hash the password 
        userData.password = bcrypt.hashSync(userData.password);

        // Convert the user data into an User model object
        const user = User(
            null,
            userData.email,
            userData.password,
            "spotter",
            userData.firstName,
            userData.lastName,
            null
        )

        // Use the create model function to insert this user into the DB
        models.userModel.create(user).then(user => {
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
)

//// Update user endpoint
// TODO: Fix validation on updates
// const updateUserSchema = {
//     type: "object",
//     required: ["user"],
//     properties: {
//         user: {
//             type: "object",
//             properties: {
//                 email: {
//                     type: "string"
//                 },
//                 password: {
//                     type: "string"
//                 },
//                 role: {
//                     type: "string"
//                 },
//                 firstName: {
//                     type: "string"
//                 },
//                 lastName: {
//                     type: "string"
//                 },
//                 authenticationKey: {
//                     type: ["string", "null"]
//                 },
//             }
//         }
//     }
// }

userController.patch("/users", [
    auth(["admin", "moderator", "spotter"]),
    // validate({ body: updateUserSchema })
], async (req, res) => {
    // Get the user data out of the request
    //
    // Note - the user data being updated is encapsulated in a user
    // object to avoid ambiguity between the logged in user's
    // authentication key and the authentication key of the user
    // currently being updated.
    const userData = req.body.user

    // TODO: Enforce that moderators and spotters can only
    // update their own user records.  

    // hash the password if it isn't already hashed
    if (userData.password && !userData.password.startsWith("$2a")) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Convert the user data into a User model object
    const user = User(
        userData.id,
        userData.email,
        userData.password,
        userData.role,
        userData.firstName,
        userData.lastName,
        userData.authenticationKey
    )

    // Use the update model function to update this user in the DB
    models.userModel.update(user).then(user => {
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
})

//// Delete user by ID endpoint
const deleteUserByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

userController.delete("/users/:id", [
    auth(["admin"]),
    validate({ params: deleteUserByIDSchema })
], (req, res) => {
    const userID = req.params.id

    models.userModel.deleteByID(userID).then(result => {
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
)

export default userController