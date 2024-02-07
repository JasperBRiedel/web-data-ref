import { Router } from "express";
import bcrypt from "bcryptjs"
import { v4 as uuid4 } from "uuid"
import * as Users from "../models/user.js";
import auth from "../middleware/auth.js";

const userController = Router()


// * Moved to auth controller
userController.post("/users/login", (req, res) => {
    /* 
    #swagger.summary = 'User login'
    #swagger.requestBody = {
        description: 'Attempt user login with email and password',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                    }
                },
                example: {
                    email: 'user@server.com',
                    password: 'abc123',
                }
            }
        }
    } 
    #swagger.responses[200] = {
        description: 'Login successful',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                        authenticationKey: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    #swagger.responses[400] = {
        description: 'Invalid credentials',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    #swagger.responses[500] = {
        description: 'Database error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    */

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
}
)

// * Moved to auth controller
userController.post("/users/logout", (req, res) => {
    /* 
    #swagger.summary = 'User logout'
    #swagger.requestBody = {
        description: 'Invalidate and clear current authentication key from the system',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        authenticationKey: {
                            type: 'string'
                        },
                    }
                },
                example: {
                    authenticationKey: '5814b177-b041-48c6-b913-9ed2d4a785e4',
                }
            }
        }
    } 
    #swagger.responses[200] = {
        description: 'Logout successful',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    #swagger.responses[500] = {
        description: 'Database error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    */
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
)

// * Moved to users controller
userController.get("/users/:id",
    auth(["admin", "moderator", "spotter"]),
    (req, res) => {
        /* 
        #swagger.summary = 'Get user by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'User ID',
            type: 'string'
        } 
        #swagger.responses[200] = {
            description: 'Found user',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'number'
                            },
                            message: {
                                type: 'string'
                            },
                            user: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string'
                                    },
                                    email: {
                                        type: 'string'
                                    },
                                    password: {
                                        type: 'string'
                                    },
                                    role: {
                                        type: 'string',
                                        enum: ['spotter', 'moderator', 'admin']
                                    },
                                    authenticationKey: {
                                        type: 'string'
                                    },
                                }
                            }
                        }
                    },
                }
            }
        } 
        #swagger.responses[500] = {
            description: 'Database error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'number'
                            },
                            message: {
                                type: 'string'
                            },
                        }
                    },
                }
            }
        } 
        */
        const userId = req.params.id

        // TODO: Enforce that moderator and spotter users
        // can only get them selves. 

        Users.getById(userId).then(user => {
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

// * Moved to users controller
userController.get("/users/key/:authenticationKey",
    (req, res) => {
        /* 
        #swagger.summary = 'Get user by authentication key'
        #swagger.parameters['authenticationKey'] = {
            in: 'path',
            description: 'Authentication Key',
            type: 'string'
        } 
        #swagger.responses[200] = {
            description: 'Found user',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'number'
                            },
                            message: {
                                type: 'string'
                            },
                            user: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string'
                                    },
                                    email: {
                                        type: 'string'
                                    },
                                    password: {
                                        type: 'string'
                                    },
                                    role: {
                                        type: 'string',
                                        enum: ['spotter', 'moderator', 'admin']
                                    },
                                    authenticationKey: {
                                        type: 'string'
                                    },
                                }
                            }
                        }
                    },
                }
            }
        } 
        #swagger.responses[500] = {
            description: 'Database error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'number'
                            },
                            message: {
                                type: 'string'
                            },
                        }
                    },
                }
            }
        } 
        */
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
)

// * Moved to users controller
userController.post("/users", [
    auth(["admin"]),
], (req, res) => {
    /* 
    #swagger.summary = 'Create user'
    #swagger.requestBody = {
        description: 'Create a new user account',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                        role: {
                            type: 'string',
                            enum: ['spotter', 'moderator', 'admin']
                        },
                    }
                },
            }
        }
    } 
    #swagger.responses[200] = {
        description: 'User created',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                        user: {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string'
                                },
                                email: {
                                    type: 'string'
                                },
                                password: {
                                    type: 'string'
                                },
                                role: {
                                    type: 'string',
                                    enum: ['spotter', 'moderator', 'admin']
                                },
                                authenticationKey: {
                                    type: 'string'
                                },
                            }
                        }
                    }
                },
            }
        }
    } 
    #swagger.responses[500] = {
        description: 'Database error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    */
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
)

// * Moved to auth controller
userController.post(
    "/users/register",
    (req, res) => {
        /* 
        #swagger.summary = 'Register user'
        #swagger.requestBody = {
            description: 'Register a new user account',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: {
                                type: 'string'
                            },
                            password: {
                                type: 'string'
                            },
                        }
                    },
                }
            }
        } 
        #swagger.responses[200] = {
            description: 'User created',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'number'
                            },
                            message: {
                                type: 'string'
                            },
                            user: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string'
                                    },
                                    email: {
                                        type: 'string'
                                    },
                                    password: {
                                        type: 'string'
                                    },
                                    role: {
                                        type: 'string',
                                        enum: ['spotter', 'moderator', 'admin']
                                    },
                                    authenticationKey: {
                                        type: 'string'
                                    },
                                }
                            }
                        }
                    },
                }
            }
        } 
        #swagger.responses[500] = {
            description: 'Database error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'number'
                            },
                            message: {
                                type: 'string'
                            },
                        }
                    },
                }
            }
        } 
        */
        // Get the user data out of the request
        const userData = req.body

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
)

// * Moved to users controller
userController.patch("/users", [
    auth(["admin", "moderator", "spotter"]),
], async (req, res) => {
    /* 
    #swagger.summary = 'Update user'
    #swagger.requestBody = {
        description: 'Update an existing user account',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                        role: {
                            type: 'string',
                            enum: ['spotter', 'moderator', 'admin']
                        },
                        authenticationKey: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    #swagger.responses[200] = {
        description: 'User created',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                        user: {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string'
                                },
                                email: {
                                    type: 'string'
                                },
                                password: {
                                    type: 'string'
                                },
                                role: {
                                    type: 'string',
                                    enum: ['spotter', 'moderator', 'admin']
                                },
                                authenticationKey: {
                                    type: 'string'
                                },
                            }
                        }
                    }
                },
            }
        }
    } 
    #swagger.responses[500] = {
        description: 'Database error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    */
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
})


// * Moved to users controller
userController.delete("/users/:id", [
    auth(["admin"]),
], (req, res) => {
    /* 
    #swagger.summary = 'Delete user by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        type: 'string'
    } 
    #swagger.responses[200] = {
        description: 'Deleted user',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    #swagger.responses[500] = {
        description: 'Database error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    } 
    */
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
)

export default userController