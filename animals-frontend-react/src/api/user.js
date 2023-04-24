import { API_URL } from "./api"

export async function login(email, password) {
    const response = await fetch(
        API_URL + "/users/login",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject
}

export async function logout(authenticationKey) {
    const response = await fetch(
        API_URL + "/users/logout",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                authenticationKey
            })
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject
}

export async function getAllUsers(authenticationKey) {
    // GET from the API /users
    const response = await fetch(
        API_URL + "/users?authKey=" + authenticationKey,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.users
}

export async function getUserByID(userID, authenticationKey) {
    const response = await fetch(
        API_URL + "/users/" + userID + "?authKey=" + authenticationKey,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.user
}

export async function getByAuthenticationKey(authenticationKey) {
    const response = await fetch(
        API_URL + "/users/by-key/" + authenticationKey,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.user
}

export async function update(user, authenticationKey) {
    const response = await fetch(
        API_URL + "/users",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ user, authenticationKey })
        }
    )

    const patchUserResult = await response.json()

    return patchUserResult
}

export async function registerUser(user) {
    const response = await fetch(
        API_URL + "/users/register",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        }
    )

    const patchUserResult = await response.json()

    return patchUserResult
}