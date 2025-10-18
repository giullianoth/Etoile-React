const apiUrl = "http://localhost:3000/plates"

const getAvailablePlates = async () => {
    try {
        const res = await fetch(`${apiUrl}/available`, {
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

const platesServices = { getAvailablePlates }

export default platesServices