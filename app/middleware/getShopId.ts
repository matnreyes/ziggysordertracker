export async function getShopId(token: string) {
    const response = await fetch('https://openapi.etsy.com/api/v3/users/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': `${process.env.ETSY_API_KEY}:${process.env.ETSY_API_SECRET}`
        }
    })
    
    const data = await response.json()
    return data.shop_id || null
}