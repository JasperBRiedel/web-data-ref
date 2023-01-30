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

// Enable JSON request body parsing
app.use(express.json())

import animalsController from "./controllers/animals.js"
app.use(animalsController)

// Start listening for API requests
app.listen(
    port,
    () => console.log(`Express started on http://localhost:${port}`),
)