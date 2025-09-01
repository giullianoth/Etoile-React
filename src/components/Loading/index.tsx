import styles from "./Loading.module.css"

type Props = {
  inButton?: boolean
}

const Loading = ({ inButton }: Props) => {
  return (
    <div className={styles.loading + (inButton ? ` ${styles.inButton}` : "")}>
      <div className={styles.circle}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  )
}

export default Loading