export interface IPlate {
    _id: string
    name: string
    image?: string
    categoryId: string
    description: string
    price: number
    available: boolean
    pairing?: string
    ingredients: string[]
}