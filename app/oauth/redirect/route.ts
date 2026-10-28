import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const cookieStore = await cookies()
    const authCode = params.get('code')
    const codeVerifier = req.cookies.get('code_verifier')?.value
    const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token'
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: process.env.ETSY_API_KEY!,
            redirect_uri: process.env.REDIRECT_URI!,
            code: authCode,
            code_verifier: codeVerifier,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const apiResponse =  await fetch(tokenUrl, requestOptions)

    if (apiResponse.ok) {
        const tokenData = await apiResponse.json()
        cookieStore.set('access_token', tokenData.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: tokenData.expires_in,
            path: '/'
        })
        return NextResponse.redirect('http://localhost:3000/orders')
    } else {
        return NextResponse.json({ message: await apiResponse.text() })
    }
}