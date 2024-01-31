/**
 * Route Handler for getting a user based on their ID.
 * @param {Request} req 
 * @param {Response} res 
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
