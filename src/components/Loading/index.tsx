import styles from "./Loading.module.css"

type Props = {
    inButton?: boolean
    className?: string
}

const Loading = ({ inButton, className }: Props) => {
    return (
        <div className={styles.loading +
            (inButton ? ` ${styles.inButton}` : "") +
            (className ? ` ${className}` : "")}>
            <div className={styles.loading__circle}>
                <div className={styles.loading__spinner}></div>
            </div>
        </div>
    )
}

export default Loading