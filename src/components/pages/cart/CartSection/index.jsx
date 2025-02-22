import Container from '../../../Container'
import styles from './CartSection.module.css'
import SectionTitle from "../../../SectionTitle"
import Grid from "../../../Grid"
import plateImage from "../../../../assets/images/presentation-image-1.jpg"
import CartItem from '../CartItem'
import { Link } from 'react-router-dom'
import { Check } from "../../../../assets/svg/check"

const cartItems = [
  {
    image: plateImage,
    name: "Shrimp and Vegetable Salad",
    ingredients: "Cooked shrimp, Seasonal vegetables, Salad dressing",
    description: "A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will make your lunch or dinner shine!",
    quantity: 1
  },
  {
    image: plateImage,
    name: "Shrimp and Vegetable Salad",
    ingredients: "Cooked shrimp, Seasonal vegetables, Salad dressing",
    description: "A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will make your lunch or dinner shine!",
    quantity: 1
  },
  {
    image: plateImage,
    name: "Shrimp and Vegetable Salad",
    ingredients: "Cooked shrimp, Seasonal vegetables, Salad dressing",
    description: "A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will make your lunch or dinner shine!",
    quantity: 1
  },
]

const CartSection = () => {
  return (
    <section className={styles.cartSection}>
      <Container spaced={true}>
        <SectionTitle>Meus itens</SectionTitle>

        {/* <p className={styles.cartSection__empty}>
          Você ainda não adicionou items no carrinho. <Link to="/pratos">Clique aqui e veja nossas espeialidades</Link>!
        </p> */}

        <div>
          <Grid columns={1} gap={20} className={styles.cartSection__list}>
            {cartItems.map((item, index) => (
              <CartItem
                key={`cart-item-${index + 1}`}
                image={item.image}
                name={item.name}
                ingredients={item.ingredients}
                description={item.description}
                quantity={item.quantity} />
            ))}
          </Grid>

          <button className={`button primary ${styles.cartSection__action}`}>
            <Check />
            Confirmar pedido
          </button>
        </div>
      </Container>
    </section>
  )
}

export default CartSection