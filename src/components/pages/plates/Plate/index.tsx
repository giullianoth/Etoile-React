import type { MouseEventHandler } from "react"
import styles from "./Plate.module.css"

type Props = {
  onClick: MouseEventHandler
}

const Plate = ({ onClick }: Props) => {
  return (
    <article className={styles.plate} onClick={onClick}>
      <img src="/images/plate.jpg" alt="Prato" />

      <div className={styles.plate__info}>
        <header className={styles.plate__name}>
          <h4>Prato</h4>
        </header>

        <p className={styles.plate__description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, voluptatum.</p>
        <p className={styles.plate__price}>$ 10,99</p>
      </div>
    </article>
  )
}

export default Plate