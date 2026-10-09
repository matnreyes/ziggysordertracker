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
            'x-api-key': process.env.ETSY_API_KEY
        }
    }
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})