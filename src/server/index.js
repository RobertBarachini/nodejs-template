// Create a simple express server

import express from 'express'

import { logger } from '#utils/logger.js'

const app = express()
const log = logger({ service: 'server', level: 'info' })

const PORT = process.env.PORT ?? 3000

app.get('/hello', (req, res) => {
	res.status(200).send('Hello World!')
})

// NOTE: Remove this route in production
app.get('/env', (req, res) => {
	if (process.env.NODE_ENV !== 'development') {
		return res.status(404).send('Not Found')
	}
	res.status(200).send(process.env)
})

app.get('/health', (req, res) => {
	res.status(200).send('OK')
})

app.get('/time', (req, res) => {
	const date = new Date()
	console.log(`GET /time: ${date}`)
	res.status(200).send(date)
})

app.listen(PORT, () => {
	log.info(`Server listening on port ${PORT}`)
})
