import { cookies } from "next/headers"
import { Suspense } from "react"
import getActiveOrders from "../middleware/getActiveOrders"

const Orders = async () => {
    const orders = await getActiveOrders()

    const sampleOrders = [
        {
            id: 123,
            title: 'Ayn Thor Skin - Classic Sprites',
            variant: 'Black'
        }
    ]

    return (
        <ul>
            <li>Orders</li>
            {orders.map((order, i) => <li key={i}>{order.title}</li>)}
        </ul>
    )
}

export default function OrderPage () {
    return (
        <div>
            <Suspense fallback={<p>hi</p>}>
                <Orders />
            </Suspense>
        </div>
    )
}