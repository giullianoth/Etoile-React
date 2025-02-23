import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loading}>
        <div className={styles.loading__circle}>
            <div className={styles.loading__spinner}></div>
        </div>
    </div>
  )
}

export default Loading