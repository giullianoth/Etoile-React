import type { IPresentation } from "../interfaces/presentation"
import presentationImage1 from "/images/presentation-image-1.jpg"
import presentationImage2 from "/images/presentation-image-2.jpg"
import presentationImage3 from "/images/presentation-image-3.jpg"

export const presentation: IPresentation[] = [
    {
        title: "Excelência na Vida Cotidiana",
        text: "Descubra nossa seleção diária de pratos exclusivos para adicionar um toque fresco e refinado à sua mesa.",
        image: presentationImage1
    },
    {
        title: "Ingredientes de primeira escolha",
        text: "Selecionamos cuidadosamente ingredientes excepcionais para garantir a mais alta qualidade em seus pratos favoritos.",
        image: presentationImage2
    },
    {
        title: "Para todos os gostos",
        text: "Explore um mundo de sabores com nossa oferta abrangente, projetada para satisfazer o paladar de toda a família, de aperitivos a sobremesas.",
        image: presentationImage3
    },
]