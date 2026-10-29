const Orders = () => {
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
            {sampleOrders.map(order => <li key={order.id}>{order.title}</li>)}
        </ul>
    )
}

export default function OrderPage () {
    return (
        <div>
            <Orders />
        </div>
    )
}