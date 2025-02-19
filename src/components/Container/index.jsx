import styles from './Container.module.css'

const Container = ({ children, className, spaced }) => {
    return (
        <div className={styles.container +
            (className ? ` ${className}` : "") +
            (spaced ? ` ${styles.containerSpaced}` : "")}>
            {children}
        </div>
    )
}

export default Container