import styles from "./SectionHeading.module.css"

type Props = {
    title: string
}

const SectionHeading = ({ title }: Props) => {
    return (
        <header className={styles.heading}>
            <h2>{title}</h2>
        </header>
    )
}

export default SectionHeading