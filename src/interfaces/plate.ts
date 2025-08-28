export interface IPlate {
    id: number
    name: string
    image?: string
    categoryId: number
    description: string
    price: number
    available: boolean
    pairing?: string
    ingredients: string[]
}