import express from "express"
import cors from "cors"
import docs from "./middleware/docs.js"
import users from "./routes/users.js"

// Create express application
const port = 8080
const app = express()

// Enable cross-origin resources sharing (CORS)
app.use(
    cors({
        origin: true, // Allow all origins
    })
)

// Enable JSON request parsing middleware. Must be done before endpoints are defined.
//
// If a request with a `Content-Type: application/json` header is
// made to a route, this middleware will treat the request body as
// a JSON string. It will attempt to parse it with `JSON.parse()`
// and set the resulting object (or array) on a `body` property of
// the request object, which you can access in your route endpoints,
// or other general middleware.
app.use(express.json())

// Register routes
app.use(docs)
app.use(users)

// Catch errors raised by endpoints and respond with JSON error object
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        status: err.status,
        message: err.message,
        errors: err.errors,
    })
})

// Start listening for API requests
app.listen(port, () => console.log(`Express started on http://localhost:${port}`))
