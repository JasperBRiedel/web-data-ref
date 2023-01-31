import { Router } from "express"
import swaggerUi from "swagger-ui-express"

import swaggerDocument from "../docs/swagger-output.json" assert { type: "json"}

const docsRouter = Router()

docsRouter.use("/docs", swaggerUi.serve)
docsRouter.get("/docs", swaggerUi.setup(swaggerDocument))

export default docsRouter