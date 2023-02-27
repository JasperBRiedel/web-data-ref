// This file should import all models and expose the selected database providers models as an export

// Change to either "mysql" or "mdb" to select database backend
const databaseBackend = "mysql"

let models = {}

if (databaseBackend == "mysql") {
    models = {
        animalModel: await import("./animal-sql.js"),
        userModel: await import("./user-sql.js")
    }
} else if (databaseBackend == "mdb") {
    models = {
        animalModel: await import("./animal-mdb.js"),
        userModel: await import("./user-mdb.js")
    }
} else {
    console.log("invalid database backend selected")
}

export default models  