import Container from '../../../Container'
import SectionTitle from '../../../SectionTitle'
import styles from './PlatesSection.module.css'
import plateImage from "../../../../assets/images/plate.jpg"
import Grid from '../../../Grid'
import Plate from '../Plate'

const plates = [
    {
        image: plateImage,
        name: "Shrimp and Vegetable Salad",
        description: "A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will make your lunch or dinner shine!",
        price: 10.99
    },
    {
        image: plateImage,
        name: "Shrimp and Vegetable Salad",
        description: "A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will make your lunch or dinner shine!",
        price: 10.99
    },
    {
        image: plateImage,
        name: "Shrimp and Vegetable Salad",
        description: "A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will make your lunch or dinner shine!",
        price: 10.99
    },
]

const PlatesSection = () => {
    return (
        <section className={styles.platesSection}>
            <Container spaced={true}>
                <SectionTitle>Confira nossos pratos</SectionTitle>

                <Grid columns={3} gap={20}>
                    {plates.map((plate, index) => (
                        <Plate
                            key={`plate-${index + 1}`}
                            image={plate.image}
                            name={plate.name}
                            price={plate.price} />
                    ))}
                </Grid>
            </Container>
        </section>
    )
}

export default PlatesSection