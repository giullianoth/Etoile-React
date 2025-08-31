import { apiUrl } from "./api-config"

const getCategories = async () => {
    try {
        const res = await fetch(`${apiUrl}/categories`, {
            method: "GET",
            headers: {}
        }).then(res => res.json())

        return res
    } catch (error) {
        console.error(error)
    }
}

const categoriesServices = {
    getCategories,
}

export default categoriesServices