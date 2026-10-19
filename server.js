require('dotenv').config()

const codeGenerator = require('./code-generator.js')
const express = require('express')
const fetch = require('node-fetch')
const hbs = require('hbs')
const { state, codeChallenge, codeVerifier } = codeGenerator()

const app = express()
app.set('view engine', 'hbs')
app.set('views', `${process.cwd()}/views`)

app.get('/', (req, res) => {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.ETSY_API_KEY,
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'transactions_r email_r shops_r',
        state,
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
        res.send('oops')
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
            code_verifier: codeVerifier,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(tokenUrl, requestOptions)

    if (response.ok) {
        const tokenData = await response.json()
        res.redirect(`/welcome?access_token=${tokenData.access_token}`)
    } else {
        res.send('oops')
    }
})

app.get('/welcome', async (req, res) => {
    const { access_token } = req.query

    const user_id = access_token.split('.')[0]

    const requestOptions = reqHeaders(access_token)

    const response = await fetch(
        `https://api.etsy.com/v3/application/users/${user_id}`,
        requestOptions
    )

    if (response.ok) {
        const userData = await response.json()
        res.render('welcome', {
            first_name: userData.first_name,
            profile_pic: userData.image_url_75x75
        })
    } else {
        res.send('oops')
    }
})

const reqHeaders = (token) => ({
    headers: {
        'x-api-key': `${process.env.ETSY_API_KEY}:${process.env.ETSY_SHARED_SECRET}`,
        Authorization: `Bearer ${token}`,
    }
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})