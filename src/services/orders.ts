const apiUrl = "http://localhost:3000/orders"

const getOrdersByUser = async (userId: string) => {
    try {
        const res = await fetch(`${apiUrl}/by-user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const ordersServices = { getOrdersByUser }

export default ordersServices