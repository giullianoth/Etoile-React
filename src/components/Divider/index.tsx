import styles from "./Divider.module.css"
import stars from "/images/divider.svg"

const Divider = () => {
  return (
    <div className={styles.divider}>
        <img src={stars} alt="Divisor" />
    </div>
  )
}

export default Divider