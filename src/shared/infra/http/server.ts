import 'reflect-metadata'
import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import uploadConfig from '@config/upload'
import createConnection from '@shared/infra/typeorm'

import generalException from './middlewares/generalException'
import { routes } from './routes'
import swaggerFile from './swagger.json'

import '../../container'

const HOST = process.env.SERVER_HOST || 'http://localhost'
const PORT = process.env.SERVER_PORT || 3333

createConnection()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.folder('tmp')))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(generalException)

app.listen(3333, () => {
  console.log(`🚀 Server started at ${HOST}:${PORT}`)
})
