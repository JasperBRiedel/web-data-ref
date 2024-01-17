# Web Data MongoDB Web API Project

**This project is currently undergoing a restructure for 2024**

-   [x] Update file structure and dependencies
-   [x] Transition from swagger-autogen to swagger-jsdoc
-   [x] Setup automatic request/response validation based on generated openAPI spec
-   [ ] Migrate endpoints from controllers into routes
    -   [ ] Convert endpoint documentation into @openapi yaml
-   [ ] Update readme file (technologies and getting started)

---

**Web Data MongoDB Web API** is a project that briefly demonstrates how to integrate MongoDB with an express web API. This project offers a set of endpoints for performing CRUD (Create, Read, Update, Delete) operations on the data from the Animal Spotting example project. This project is primarily intended as a reference for second-semester web development students in the ICT50220 Diploma program.

Please be aware that this project prioritizes simplicity and educational value over production readiness. Its main objective is to serve as a teaching tool for fundamental techniques related to MongoDB integration and API development.

## Technologies Used

This project relies on the following technologies and libraries specified in the `package.json` file:

-   **Express**: A fast and minimalist web framework for Node.js, used for handling routing, middleware, and HTTP request/response management.

-   **MongoDB**: A NoSQL database system that offers flexibility and scalability for storing web data.

-   **Node.js**: A JavaScript runtime environment used for building scalable network applications.

-   **Swagger UI Express**: A library for building interactive API documentation, simplifying API exploration and testing.

-   **Other Dependencies**: Additional libraries used in this project include:

    -   **bcryptjs**: A library for secure password hashing.

    -   **cors**: Middleware for enabling cross-origin resource sharing.

    -   **dotenv**: A library for managing environment variables.

    -   **express-fileupload**: Middleware for handling file uploads.

    -   ~~**express-json-validator-middleware**: Middleware for JSON request validation.~~

    -   **mongodb**: The official MongoDB driver for Node.js.

    -   **mysql2**: A Node.js-based MySQL client library.

    -   **swagger-ui-express**: Middleware for serving Swagger UI.

    -   **uuid**: A library for generating UUIDs.

    -   **xml2js**: A library for parsing XML data.

## Getting Started

To start using **Web Data MongoDB Web API**, follow these steps:

1. Install project dependencies:

    `npm install`

2. Set up your MongoDB database and configure the connection string in a `.env` file.

3. There are several npm scripts available for different purposes:

    - `npm run api`: Starts the API server without generating documentation.

    - `npm run docs`: Generates Swagger API documentation.

    - `npm run all`: Runs both the API server and generates Swagger documentation using Nodemon for automatic reloading during development.

4. Access the Swagger API documentation at `http://localhost:8080/docs` to explore the available endpoints and test the API.

**Disclaimer**: This source code is provided without any warranty, express or implied. Usage of the resources within this repository is at your own risk.
