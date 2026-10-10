require('dotenv').config()

const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.get('/', (req, res) => {
    res.send('Homepage')
})

app.get('/ping', async (req, res) => {
    const requestOptions = {
        'method': 'GET',
        'headers': {
            'x-api-key': `${process.env.ETSY_API_KEY}:${process.env.ETSY_SHARED_SECRET}`
        }
    }

    const response = await fetch(
        'https://api.etsy.com/v3/application/openapi-ping',
        requestOptions
    )

    if (response.ok) {
        const data = await response.json()
        res.send(data)
    } else {
        res.send("oops")
    }
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})