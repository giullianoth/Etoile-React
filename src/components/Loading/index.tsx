import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.loading}>
        <div className={styles.circle}>
            <div className={styles.spinner}></div>
        </div>
    </div>
  )
}

export default Loading