import styles from './SectionTitle.module.css'

const SectionTitle = ({ children }) => {
    return (
        <header className={styles.sectionTitle}>
            <h1>{children}</h1>
        </header>
    )
}

export default SectionTitle