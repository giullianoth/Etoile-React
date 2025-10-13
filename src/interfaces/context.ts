import type { IAuthReducerState } from "./reducer-states"
import type { IUser, IUserRegister } from "./user"

export interface IContext {
    auth: {
        authState: IAuthReducerState
        login: (userData: Partial<IUser>) => Promise<void>
        logout: () => void
        register: (userData: Partial<IUserRegister>) => Promise<void>
    }
}