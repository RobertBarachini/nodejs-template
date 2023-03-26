// Create a simple express server

import express from 'express'

import { logger } from '#utils/logger.js'

const app = express()
const log = logger({ service: 'server', level: 'info' })

const PORT = process.env.PORT ?? 3000

app.get('/hello', (req, res) => {
	res.status(200).send('Hello World!')
})

app.get('/env', (req, res) => {
	res.status(200).send(process.env)
})

app.listen(PORT, () => {
	log.info(`Server listening on port ${PORT}`)
})
