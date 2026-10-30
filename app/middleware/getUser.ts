import setAuthorizedHeader from "./setAuthorizedHeader";

export default async function getUser(token: string) {

    const response = await fetch(
        'https://openapi.etsy.com/v3/application/users/me',
        setAuthorizedHeader(token)
    )
    
    if (response.ok) {
        const user = JSON.parse(await response.text())
        return (user)
    }
}