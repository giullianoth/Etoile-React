import type { ICategory } from "../interfaces/category"
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

const addCategory = async (categoryData: Partial<ICategory>) => {
    try {
        const res = await fetch(`${apiUrl}/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        }).then(res => res.json())

        return res
    } catch (error) {
        console.error(error)
    }
}

const updateCategory = async (categoryId: string, categoryData: Partial<ICategory>) => {
    try {
        const res = await fetch(`${apiUrl}/categories/${categoryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        }).then(res => res.json())

        return res
    } catch (error) {
        console.error(error)
    }
}

const deleteCategory = async (categoryId: string) => {
    try {
        const res = await fetch(`${apiUrl}/categories/${categoryId}`, {
            method: "DELETE",
            headers: {}
        }).then(res => res.json())

        return res
    } catch (error) {
        console.error(error)
    }
}

const categoriesService = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
}

export default categoriesService