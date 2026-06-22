import type { ICartContext } from "./cart"
import type { IMessageContext } from "./message"
import type { IAuthReducer, IOrdersReducer, IPlatesReducer, IUsersReducer } from "./reducer-states"

export interface IAppContext {
    message: IMessageContext
    cart: ICartContext
    auth: IAuthReducer
    plates: IPlatesReducer
    orders: IOrdersReducer
    users: IUsersReducer
}