export interface IPlate {
    _id: string
    name: string
    image?: string
    categoryId: string
    category: string
    description: string
    price: number
    available: boolean
    pairing?: string
    ingredients: string[]
}

export interface ICategory {
    _id: string
    name: string
    description: string
}