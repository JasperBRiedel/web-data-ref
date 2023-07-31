import express from "express"
import cors from "cors"

// Create express application
const port = 8080
const app = express()

// Enable cross-origin resources sharing (CORS)
app.use(cors({
    // Allow all origins
    origin: true,
}))

// Enable JSON request parsing middleware. Must be done before endpoints are defined.
//
// If a request with a `Content-Type: application/json` header is
// made to a route, this middleware will treat the request body as
// a JSON string. It will attempt to parse it with `JSON.parse()`
// and set the resulting object (or array) on a `body` property of
// the request object, which you can access in your route endpoints,
// or other general middleware.
app.use(express.json())

// Import and enable swagger documentation pages
import docsRouter from "./middleware/swagger-doc.js"
app.use(docsRouter)

// Import and use the routers of each controller.
import userController from "./controllers/users.js"
app.use(userController)
import sightingController from "./controllers/sightings.js"
app.use(sightingController)

// Start listening for API requests
app.listen(
    port,
    () => console.log(`Express started on http://localhost:${port}`),
)