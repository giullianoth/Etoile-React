import Container from '../../../Container'
import styles from './Presentation.module.css'
import Grid from '../../../Grid'
import presentationImage1 from "../../../../assets/images/presentation-image-1.jpg"
import presentationImage2 from "../../../../assets/images/presentation-image-2.jpg"
import presentationImage3 from "../../../../assets/images/presentation-image-3.jpg"
import PresentationItem from '../PresentationItem'

const presentation = [
  {
    image: presentationImage1,
    title: "Excelência na Vida Cotidiana",
    text: "Descubra nossa seleção diária de pratos exclusivos para adicionar um toque fresco e refinado à sua mesa."
  },
  {
    image: presentationImage2,
    title: "Ingredientes de primeira escolha",
    text: "Selecionamos cuidadosamente ingredientes excepcionais para garantir a mais alta qualidade em seus pratos favoritos."
  },
  {
    image: presentationImage3,
    title: "Gosto para todos",
    text: "Explore um mundo de sabores com nossa oferta abrangente, projetada para satisfazer o paladar de toda a família, de aperitivos a sobremesas."
  },
]

const Presentation = () => {
  return (
    <section className={styles.presentation}>
      <Container spaced={true} >
        <Grid columns={3} gap={20} collapsed={true}>
          {presentation.map((item, index) => (
            <PresentationItem
              key={`presentation-${index + 1}`}
              image={item.image}
              title={item.title}
              text={item.text} />
          ))}
        </Grid>
      </Container>
    </section>
  )
}

export default Presentation