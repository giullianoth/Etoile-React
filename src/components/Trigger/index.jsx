import styles from './Trigger.module.css'

const Trigger = ({ children, type, icon, clickable, onClick }) => {
    return (
        <div
            className={`${styles.trigger} ${styles[type]}` + (clickable ? ` ${styles.clickable}` : "")}
            onClick={() => onclick && onclick()}>
            {icon}
            {children}
        </div>
    )
}

export default Trigger