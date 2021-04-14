import 'reflect-metadata'

import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import uploadConfig from '@config/upload-config'
import createConnection from '@shared/infra/typeorm'

import generalException from './middlewares/generalException'
import rateLimiter from './middlewares/rateLimiter'
import { routes } from './routes'
import swaggerFile from './swagger.json'

import '../../container'

createConnection()

const app = express()

app.use(rateLimiter)

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())

app.use('/files', express.static(uploadConfig.tmpFolder))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(cors())
app.use(routes)

app.use(Sentry.Handlers.errorHandler())

app.use(generalException)

export { app }
