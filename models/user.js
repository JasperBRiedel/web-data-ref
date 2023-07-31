import { ObjectId } from "mongodb"
import { db } from "../database/mongodb.js";

export function User(
    _id,
    email,
    password,
    role,
    authenticationKey
) {
    return {
        _id,
        email,
        password,
        role,
        authenticationKey
    }
}

export async function create(user) {
    // Clear _id from user to ensure the new user does not 
    // have an existing _id from the database, as we want a new _id
    // to be created and added to the user object.
    delete user.id

    // Insert the user document and implicitly add the new _id to user 
    return db.collection("users").insertOne(user)
}

export async function getById(id) {
    // attempt to find the first matching user by id
    let user = await db.collection("users").findOne({ _id: new ObjectId(id) })

    // check if a user was found and handle the result
    if (user) {
        return user
    } else {
        return Promise.reject("user not found with id " + id)
    }
}

export async function getByEmail(email) {
    // attempt to find the first matching user by email
    let user = await db.collection("users").findOne({ email: email })

    // check if a user was found and handle the result
    if (user) {
        return user
    } else {
        return Promise.reject("user not found with email " + email)
    }
}

export async function getByAuthenticationKey(key) {
    // attempt to find the first matching user by authentication key
    let user = await db.collection("users").findOne({ authenticationKey: key })

    // check if a user was found and handle the result
    if (user) {
        return user
    } else {
        // do not return authentication key in error for security reasons
        return Promise.reject("user not found")
    }
}

export async function update(user) {
    // update the user by replacing the user with matching _id with user
    return db.collection("users").replaceOne({ _id: new ObjectId(user._id) }, user)
}

export async function deleteById(id) {
    return db.collection("users").deleteOne({ _id: new ObjectId(id) })
}

// export async function getAll() {
//     // Get the collection of all users
//     let allUserResults = await db.collection("users").find().toArray()
//     // Convert the collection of results into a list of User objects
//     return await allUserResults.map((userResult) =>
//         User(
//             userResult._id.toString(),
//             userResult.email,
//             userResult.password,
//             userResult.role,
//             userResult.firstName,
//             userResult.lastName,
//             userResult.authenticationKey
//         )
//     )
// }