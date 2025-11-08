import type { MouseEventHandler } from "react"
import styles from "./Plate.module.css"
import type { IPlate } from "../../../../types/plate"
import { useCurrency } from "../../../../hooks/useCurrency"

type Props = {
  onClick: MouseEventHandler
  plate: IPlate
}

const Plate = ({ onClick, plate }: Props) => {
  const currency = useCurrency()

  return (
    <article className={styles.plate} onClick={onClick}>
      <img src={plate.image ? `/images/plates/${plate.image}` : "/images/no-image.jpg"} alt={plate.name} />

      <div className={styles.plate__info}>
        <header className={styles.plate__name}>
          <h4>{plate.name}</h4>
        </header>

        <p className={styles.plate__description}>{plate.description}</p>
        <p className={styles.plate__price}>{currency(plate.price)}</p>
      </div>
    </article>
  )
}

export default Plate