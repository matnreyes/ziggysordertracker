import setAuthorizedHeader from "./setAuthorizedHeader"
import { cookies } from "next/headers"
import getUser from "./getUser"
import type { FormattedReceipt, Receipt } from '@/types/etsy'

export default async function getActiveOrders() {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) {
        throw Error('Missing token.')
    }
    
    const user = await getUser(token)
    const shopId = user.shop_id
    const searchOptions = new URLSearchParams({
        limit: '35',
        was_paid: 'true',
        was_shipped: 'false',
        was_cancelled: 'false'
    })

    const receiptResponse = await fetch(
        `https://openapi.etsy.com/v3/application/shops/${shopId}/receipts?${searchOptions}`,
        setAuthorizedHeader(token)
    )

    if (receiptResponse.ok) {
        const receipts = JSON.parse(await receiptResponse.text()).results
        const formattedReceipts: FormattedReceipt[] = receipts.map((receipt: Receipt) => {
            const formattedReceipt: FormattedReceipt = {
                title: receipt.transactions[0].title,
                variant: receipt.transactions[0].variations[0] ? receipt.transactions[0].variations[0].formatted_value : 'None',
                listingId: receipt.transactions[0].listing_id,
                productId: receipt.transactions[0].product_id,
                listingImageId: receipt.transactions[0].listing_image_id
            }
            return formattedReceipt
        })
        return formattedReceipts
    } else {
        throw Error ('Orders were not retrieved')
    }

}