import type { FormattedReceipt } from "@/types/etsy";

type ListingCount = {
    listingId: number
    variant: string
    count: number
    title: string
}

export default function orderByVariant(orders: FormattedReceipt[]) {
    const listings = new Map<string, ListingCount>()

    for(const order of orders) {
        const key = `${order.title} : ${order.variant}`
        if (!listings.has(key)) {
            listings.set(key, {
                listingId: order.listingId,
                variant: order.variant,
                count: 1,
                title: order.title
            })
        } else {
            const existing: ListingCount = listings.get(key)!
            existing.count += 1
            listings.set(key, existing)
        }
    }

    return listings.values()
}