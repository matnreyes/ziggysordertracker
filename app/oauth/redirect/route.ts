import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, ctx: RouteContext<'/oauth/redirect'>) {
    const params = request.nextUrl.searchParams
    const authCode = params.get('code')
    const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token'
    const requestOptions = {
        method: 'GET',
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: process.env.ETSY_API_KEY,
            redirect_uri: process.env.REDIRECT_URI,
            code: authCode,
            code_verifier: codeVerifier,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const apiResponse = await fetch(tokenUrl, requestOptions)

    if (apiResponse.ok) {
        const tokenData = await apiResponse.json()
        return NextResponse.json(tokenData)
    } else {
        return NextResponse.json({ message: `Failed to retrieve access token!` })
    }
}