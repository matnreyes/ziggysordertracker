import type { FormattedReceipt } from "@/types/etsy";

type ListingCount = {
    listingId: number
    variant: string
    count: number
    title: string
}

export default function orderByVariant(orders: FormattedReceipt[]) {
    const listings = []
    const totalCount: ListingCount[] = []
    orders.forEach((order: FormattedReceipt) => {
        if (!listings.includes(`${order.listingId} : ${order.variant}`)) {
            listings.push(`${order.listingId} : ${order.variant}`)
            const totalListing = orders.filter(o => order.listingId == o.listingId && order.variant == o.variant)
            totalCount.push({
                listingId: order.listingId,
                variant: order.variant,
                count: totalListing.length,
                title: order.title
            })
        }
    })

    console.log(totalCount)
    return totalCount
}