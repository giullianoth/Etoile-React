import styles from './SectionTitle.module.css'

const SectionTitle = ({ children, className }) => {
    return (
        <header className={styles.sectionTitle + (className ? ` ${className}` : "")}>
            <h1>{children}</h1>
        </header>
    )
}

export default SectionTitle