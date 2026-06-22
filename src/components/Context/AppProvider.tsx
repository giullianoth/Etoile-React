import type { ReactNode } from "react"
import type { IAppContext } from "../../types/context"
import { useAuthReducer } from "../../reducers/auth"
import { AppContext } from "../../context/app-context"
import { useMessage } from "../../hooks/message"
import { usePlatesReducer } from "../../reducers/plates"
import { useCart } from "../../hooks/cart"
import { useOrdersReducer } from "../../reducers/orders"
import { useUsersReducer } from "../../reducers/users"

type Props = {
    children: ReactNode
}

const AppProvider = ({ children }: Props) => {
    const message = useMessage()
    const cart = useCart()
    const auth = useAuthReducer()
    const plates = usePlatesReducer()
    const orders = useOrdersReducer()
    const users = useUsersReducer(auth.handleUpdateLoggedUser)

    const contextValue: IAppContext = {
        message,
        auth,
        plates,
        cart,
        orders,
        users,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider