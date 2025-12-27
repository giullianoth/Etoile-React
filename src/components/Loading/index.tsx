import styles from "./Loading.module.css"

type Props = {
    inButton?: boolean
    className?: string
    small?: boolean
}

const Loading = ({ inButton, className, small }: Props) => {
    return (
        <div className={styles.loading +
            (inButton ? ` ${styles.inButton}` : "") +
            (small ? ` ${styles.small}` : "") +
            (className ? ` ${className}` : "")}>
            <div className={styles.loading__circle}>
                <div className={styles.loading__spinner}></div>
            </div>
        </div>
    )
}

export default Loading