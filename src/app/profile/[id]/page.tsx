export default async function getUser({params}: any)
{
    return (
        <div>
            <p>Your user id is {params.id}</p>
        </div>
    )
}