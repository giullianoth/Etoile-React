import styles from "./Divider.module.css"
import dividerImage from "/images/divider.svg"

const Divider = () => {
  return (
    <div className={styles.divider}>
        <img src={dividerImage} alt="Divider" />
    </div>
  )
}

export default Divider