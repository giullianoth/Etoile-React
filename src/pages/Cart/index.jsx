import Footer from "../../components/Footer"
import Header from "../../components/Header"
import CartSection from "../../components/pages/cart/CartSection"
import ScrollUp from "../../components/ScrollUp"
import PageTitle from "../../components/PageTitle"
import CartCheckout from "../../components/pages/cart/CartCheckout"

const Cart = () => {
    return (
        <>
            <Header />
            <main>
                <PageTitle>Carrinho</PageTitle>
                <CartSection />
                {/* <CartCheckout /> */}
            </main>
            <Footer />
            <ScrollUp />
        </>
    )
}

export default Cart