import 'reflect-metadata'

import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { routes } from './routes'
import swaggerFile from './swagger.json'

import './database'
import './shared/container'

const app = express()
app.use(express.json())

const HOST = process.env.SERVER_HOST || 'http://localhost'
const PORT = process.env.SERVER_PORT || 3333

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.listen(3333, () => {
  console.log(`🚀 Server started at ${HOST}:${PORT}`)
})
