import type { IAuthState } from "./reducer-states";
import type { IUserRegister } from "./user";

interface IAuthContext extends IAuthState {
    handleChangeAuthForm: (name: keyof IUserRegister, value: string) => void
    handleClearAuthForm: () => void
    handleLogin: () => Promise<void>
    handleRegister: () => Promise<void>
    handleLogout: () => void
}

export interface IContext {
    auth: IAuthContext
}