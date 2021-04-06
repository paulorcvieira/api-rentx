import 'dotenv/config'

import { app } from './app'

const HOST = process.env.SERVER_HOST || 'http://localhost'
const PORT = process.env.SERVER_PORT || 3333

app.listen(3333, () => {
  console.log(`🚀 Server started at ${HOST}:${PORT}`)
})
