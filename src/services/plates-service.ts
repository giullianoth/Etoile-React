import { apiUrl } from "./api-config"

const getPlates = async () => {
    try {
        const res = await fetch(`${apiUrl}/plates`, {
            method: "GET",
            headers: {}
        }).then(res => res.json())

        return res
    } catch (error) {
        console.error(error)
    }
}

const getAvailablePlates = async () => {
    try {
        const res = await fetch(`${apiUrl}/plates/available`, {
            method: "GET",
            headers: {}
        }).then(res => res.json())

        return res
    } catch (error) {
        console.error(error)
    }
}

const platesServices = {
    getPlates,
    getAvailablePlates
}

export default platesServices