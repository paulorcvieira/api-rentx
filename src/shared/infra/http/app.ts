import 'reflect-metadata'

import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import uploadConfig from '@config/upload-config'
import createConnection from '@shared/infra/typeorm'

import generalException from './middlewares/generalException'
import { routes } from './routes'
import swaggerFile from './swagger.json'

import '../../container'

createConnection()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/files', express.static(uploadConfig.tmpFolder))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(generalException)

export { app }
