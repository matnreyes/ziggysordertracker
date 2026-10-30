import { User } from "@/types/etsy";
import setAuthorizedHeader from "./setAuthorizedHeader";

export default async function getUser(token: string): Promise<User> {    
    const response = await fetch(
        'https://openapi.etsy.com/v3/application/users/me',
        setAuthorizedHeader(token)
    )
    
    if (response.ok) {
        const user = JSON.parse(await response.text())
        return (user)
    } else {
        throw Error('Error occured')
    }
}