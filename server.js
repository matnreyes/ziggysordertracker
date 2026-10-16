require('dotenv').config()

const codeGenerator = require('./code-generator.js')
const express = require('express')
const fetch = require('node-fetch')
const hbs = require('hbs')
const { state, codeChallenge, codeVerifier } = codeGenerator()

const app = express()
app.set("view engine", "hbs")
app.set("views", `${process.cwd()}/views`)

app.get('/', (req, res) => {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.ETSY_API_KEY,
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'transactions_r',
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
    })

    res.render('index', { authURL: `https://www.etsy.com/oauth/connect?${params}` })
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

app.get('/oauth/redirect', async (req, res) => {
    const authCode = req.query.code
    const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token'
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: process.env.ETSY_API_KEY,
            redirect_uri: process.env.REDIRECT_URI,
            code: authCode,
            code_verifier: codeChallenge,
            state
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(tokenUrl, requestOptions)

    if (response.ok) {
        const tokenData = await response.json()
        res.send(tokenData)
    } else {

        res.send('oops')
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})