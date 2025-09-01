import type { IPlate } from "../interfaces/plate"
import { apiUrl } from "./api-config"

const getPlates = async () => {
    try {
        const res = await fetch(`${apiUrl}/plates`, {
            method: "GET",
            headers: {}
        })
        .then(res => res.json())
        .catch(err => err)

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
        })
        .then(res => res.json())
        .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const addPlate = async (plateData: Partial<IPlate>) => {
    try {
        const res = await fetch(`${apiUrl}/plates`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plateData)
        })
        .then(res => res.json())
        .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const updatePlate = async (plateId: string, plateData: Partial<IPlate>) => {
    try {
        const res = await fetch(`${apiUrl}/plates/${plateId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plateData)
        })
        .then(res => res.json())
        .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const deletePlate = async (plateId: string) => {
    try {
        const res = await fetch(`${apiUrl}/plates/${plateId}`, {
            method: "DELETE",
            headers: {}
        })
        .then(res => res.json())
        .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const platesServices = {
    getPlates,
    getAvailablePlates,
    addPlate,
    updatePlate,
    deletePlate
}

export default platesServices