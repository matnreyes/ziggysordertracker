import { cookies } from "next/headers"
import { Suspense } from "react"
import getActiveOrders from '@/lib/getActiveOrders'
import orderByVariant from "@/lib/orderByVariant"

const Orders = async () => {
    const orders = await getActiveOrders()
    const orderGroups = orderByVariant(orders)

    return (
        <ul>
            <li>Orders</li>
            {orderGroups.map((order, i) => <li key={i}>{order.title}: {order.variant} <b>{order.count}</b></li>)}
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