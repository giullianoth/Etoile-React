import type { ICategory } from "./category"

export interface IPlate {
    _id: string
    name: string
    image?: string
    categoryId: string
    description?: string
    price: number | string
    available: boolean
    pairing?: string
    ingredients: string[]
}

export interface IPlateRegister extends IPlate {
    category: ICategory
    ingredientsString: string
}