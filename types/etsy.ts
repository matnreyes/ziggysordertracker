export type User = {
    user_id: number
    shop_id: number | null
}

type Variant = {
    formatted_value: string
}

export type Transaction = {
    title: string
    variations: Variant[]
    listing_id: number
    product_id: number
    listing_image_id: number
}

export type Receipt = {
    transactions: Transaction[]
}

export type FormattedReceipt = {
    title: string
    variant: string
    listingId: number
    productId: number
    listingImageId: number
}