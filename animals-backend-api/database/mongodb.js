import { MongoClient } from "mongodb";

// Import and load environment variables
// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from "dotenv"
dotenv.config()

// const connectionString = "mongodb+srv://animal-spotting-user:jQPraNQXDe3TC9ya@cluster0.p45atut.mongodb.net/?retryWrites=true&w=majority"
const connectionString = process.env.MDBURL
const client = new MongoClient(connectionString)
export const db = client.db("animal-spotting")