import styles from './PresentationItem.module.css'

const PresentationItem = ({ image, title, text }) => {
    return (
        <article className={styles.presentationItem}>
            <img src={image} alt={title} className={styles.presentationItem__image} />

            <header className={styles.presentationItem__title}>
                <h2>{title}</h2>
            </header>

            <p className={styles.presentationItem__text}>{text}</p>
        </article>
    )
}

export default PresentationItem