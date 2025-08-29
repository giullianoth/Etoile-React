export interface IOrder {
    id: number
    userId: number
    time: string
    status: string
}

export interface IOrderItem {
    id: number
    plateId: number
    orderId: number
    quantity: number
}