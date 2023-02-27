import { db } from "../database/mysql.js";
import { User } from "./user.js";

export async function getAll() {
    const allUserResults = await db.query("SELECT * FROM users")

    return await allUserResults.map((userResult) =>
        User(
            userResult.id,
            userResult.email,
            userResult.password,
            userResult.role,
            userResult.first_name,
            userResult.last_name,
            userResult.authentication_key,
        ))
}

export async function getByID(userID) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE id = ?", userID
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            User(
                userResult.id,
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.first_name,
                userResult.last_name,
                userResult.authentication_key,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByEmail(email) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE email = ?", email
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            User(
                userResult.id,
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.first_name,
                userResult.last_name,
                userResult.authentication_key,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByAuthenticationKey(authenticationKey) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE authentication_key = ?", authenticationKey
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            User(
                userResult.id,
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.first_name,
                userResult.last_name,
                userResult.authentication_key,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}
export async function create(user) {
    delete user.id

    return db.query(
        "INSERT INTO users (email, password, role, first_name, last_name) "
        + "VALUE (?, ?, ?, ?, ?)",
        [
            user.email,
            user.password,
            user.role,
            user.firstName,
            user.lastName,
        ]
    ).then(([result]) => {
        return { ...user, id: result.insertId }
    })
}

export async function update(user) {
    return db.query(
        "UPDATE users SET "
        + "email = ?, "
        + "password = ?, "
        + "role = ?, "
        + "first_name = ?, "
        + "last_name = ?, "
        + "authentication_key = ? "
        + "WHERE id = ?",
        [
            user.email,
            user.password,
            user.role,
            user.firstName,
            user.lastName,
            user.authenticationKey,
            user.id
        ]
    ).then(([result]) => {
        return { ...user, id: result.insertId }
    })
}

export async function deleteByID(userID) {
    return db.query("DELETE FROM users WHERE id = ?", userID)
}