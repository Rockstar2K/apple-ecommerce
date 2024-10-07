import { Router } from 'express'
import productsApiRouter from './products.api.js'
import usersApiRouter from './users.api.js'
const apiRouter = Router()

apiRouter.use("/products", productsApiRouter)
apiRouter.use("/users", usersApiRouter)

export default apiRouter