import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://animal-spotting-user:jQPraNQXDe3TC9ya@cluster0.p45atut.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(connectionString)
export const db = client.db("animal-spotting")