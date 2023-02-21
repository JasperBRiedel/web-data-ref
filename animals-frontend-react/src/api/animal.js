import { API_URL } from "./api.js"

export async function getAllAnimals() {
    // GET from the API /animals
    const response = await fetch(
        API_URL + "/animals",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.animals
}

export async function getAnimalByID(animalID) {
    // GET from the API /animal/:id
    const response = await fetch(
        API_URL + "/animals/" + animalID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.animal
}

