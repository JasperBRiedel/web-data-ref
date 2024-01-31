import { Router } from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import * as OpenApiValidator from "express-openapi-validator"

const docs = Router()

const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Animal Spotting API",
            description: "JSON REST API for tracking animal sightings",
        },
        // host: "localhost:8080",
        // basePath: "",
        // schemes: ["http"],
        // consumes: ["application/json"],
        // produces: ["application/json"],
        // security: [{ AuthenticationKey: [] }],
        components: {
            securitySchemes: {
                ApiKey: {
                    type: "apiKey",
                    in: "header",
                    name: "X-AUTH-KEY",
                },
            }
        },
    },
    apis: ["./src/routes/*.js", "./src/controllers/*/*.js", "./src/components.yaml"],
}

const specification = swaggerJSDoc(options)

docs.get("/test", (req, res) => {
    res.json(specification)
})

docs.use("/docs", swaggerUi.serve, swaggerUi.setup(specification))
docs.use(
    OpenApiValidator.middleware({
        apiSpec: specification,
        validateRequests: true, // (default)
        validateResponses: true, // false by default
    })
)

/**
 * @openapi
 * /docs:
 *      get:
 *          summary: "View automatically generated API documentation"
 *          responses:
 *            '200':
 *              description: 'Swagger documentation page'
 */
docs.get("/docs", swaggerUi.setup(specification))

export default docs
