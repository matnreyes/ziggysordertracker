export default function setAuthorizedHeader(token: string) {
    return {
            headers: {
            'x-api-key': `${process.env.ETSY_API_KEY}:${process.env.ETSY_API_SECRET}`,
            Authorization: `Bearer ${token}`
        }
    }
}