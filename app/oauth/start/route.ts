import { NextResponse } from 'next/server'
import codeGenerator from '@/app/middleware/codeGenerator.js'

export async function GET(request: Request) {
    const { state, codeVerifier, codeChallenge } = codeGenerator()

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.ETSY_API_KEY!,
        redirect_uri: process.env.REDIRECT_URI!,
        scope: 'listings_r email_r transactions_r shops_r',
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
    })

    const authUrl = `https://www.etsy.com/oauth/connect?${params.toString()}`
    const res = NextResponse.redirect(authUrl)
    res.cookies.set('code_verifier', codeVerifier, { httpOnly: true, secure: true, sameSite: 'lax' })
    res.cookies.set('state', state, { httpOnly: true, secure: true, sameSite: 'lax' })
    return res
}
