export default async function UserPage({
  params,
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params
    const user = await getUser(userId)

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Open orders:</p>
        </div>
    )
}