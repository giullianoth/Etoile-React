export interface IOrder {
    id: number
    userId: number
    pickupTime: string
    pickupStatus: string
}

export interface IOrderItem {
    id: number
    plateId: number
    orderId: number
    quantity: number
}