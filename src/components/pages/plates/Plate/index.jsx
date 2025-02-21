import styles from './Plate.module.css'

const Plate = ({ image, name, price }) => {
    return (
        <article className={styles.plate}>
            <img src={image} alt={name} className={styles.plate__image} />

            <div className={styles.plate__info}>
                <header className={styles.plate__name}>
                    <h2>{name}</h2>
                </header>

                <p className={styles.plate__price}>$ {price}</p>
            </div>
        </article>
    )
}

export default Plate