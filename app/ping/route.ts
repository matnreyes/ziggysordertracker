import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'x-api-key': `${process.env.ETSY_API_KEY}:${process.env.ETSY_API_SECRET}`,
        },
    }

    const response = await fetch(
        'https://api.etsy.com/v3/application/openapi-ping',
        requestOptions
    )

    if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
    } else {
        return NextResponse.json({ message: `Etsy API is not reachable!` })
    }
}