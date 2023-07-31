import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        version: '1.0.0',
        title: 'Animal Spotting API',
        description: 'JSON REST API for tracking animal sightings',
    },
    host: 'localhost:8080',
    basePath: '',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    security: [
        { AuthenticationKey: [] }
    ],
    components: {
        securitySchemes: {
            AuthenticationKey: {
                type: "apiKey",
                in: "header",
                name: "X-AUTH-KEY"
            }
        }
    }
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);