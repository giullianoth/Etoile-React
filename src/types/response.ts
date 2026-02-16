import type { IOrder, IOrderItem } from "./order"
import type { ICategory, IPlate } from "./plate"
import type { IUser } from "./user"

interface ISuccessResponse {
    success: true
    statusCode: 200 | 201
}

export interface IErrorResponse {
    success: false
    statusCode: number
    body: {
        text: string
    }
}

// Auth
export interface IAuthSuccessResponse extends ISuccessResponse {
    body: {
        text: string
        user: IUser
        token: string
    }
}

export type IAuthResponse = IAuthSuccessResponse | IErrorResponse

// Orders
export interface IOrderFetchSuccessResponse extends ISuccessResponse {
    body: IOrder[]
}

export type IOrderFetchResponse = IOrderFetchSuccessResponse | IErrorResponse

export interface IOrdersCreateSuccessResponse extends ISuccessResponse {
    body: IOrder
}

export type IOrdersCreateResponse = IOrdersCreateSuccessResponse | IErrorResponse

export interface IOrdersUpdateSuccessResponse extends ISuccessResponse {
    body: IOrder | IOrderItem
}

export type IOrdersUpdateResponse = IOrdersUpdateSuccessResponse | IErrorResponse

export interface IOrdersDeleteSuccessResponse extends ISuccessResponse {
    body: {
        itemsToDelete: {
            acknowledged: boolean,
            deletedCount: number
        },
        orderToDelete: IOrder
    }
}

export type IOrdersDeleteResponse = IOrdersDeleteSuccessResponse | IErrorResponse

// Plates & Categories
export interface ICategoriesFetchSuccessResponse extends ISuccessResponse {
    body: ICategory[]
}

export type ICategoriesFetchResponse = ICategoriesFetchSuccessResponse | IErrorResponse

export interface ICategoriesCreateSuccessResponse extends ISuccessResponse {
    body: ICategory
}

export type ICategoriesCreateResponse = ICategoriesCreateSuccessResponse | IErrorResponse

export interface ICategoriesUpdateSuccessResponse extends ISuccessResponse {
    body: ICategory
}

export type ICategoriesUpdateResponse = ICategoriesUpdateSuccessResponse | IErrorResponse

export interface ICategoriesDeleteSuccessResponse extends ISuccessResponse {
    body: ICategory
}

export type ICategoriesDeleteResponse = ICategoriesDeleteSuccessResponse | IErrorResponse

export interface IPlatesFetchSuccessResponse extends ISuccessResponse {
    body: IPlate[]
}

export type IPlatesFetchResponse = IPlatesFetchSuccessResponse | IErrorResponse

export interface IPlatesCreateSuccessResponse extends ISuccessResponse {
    body: ICategory
}

export type IPlatesCreateResponse = IPlatesCreateSuccessResponse | IErrorResponse

export interface IPlatesUpdateSuccessResponse extends ISuccessResponse {
    body: ICategory
}

export type IPlatesUpdateResponse = IPlatesUpdateSuccessResponse | IErrorResponse

export interface IPlatesDeleteSuccessResponse extends ISuccessResponse {
    body: ICategory
}

export type IPlatesDeleteResponse = IPlatesDeleteSuccessResponse | IErrorResponse

// Users
export interface IUserUpdateSuccessResponse extends ISuccessResponse {
    body: IUser
}

export type IUserUpdateResponse = IUserUpdateSuccessResponse | IErrorResponse