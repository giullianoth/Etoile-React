import type { ComponentProps, ReactNode } from "react"
import styles from "./InputWithLabel.module.css"

interface Props extends ComponentProps<"select"> {
    label: string
    children?: ReactNode
}

const SelectWithLabel = (props: Props) => {
    const { label, children, ...propsRest } = props

    return (
        <label className={styles.input}>
            <span className={styles.input__label}>
                <strong>
                    {label}
                    {propsRest.required && " *"}
                </strong>
            </span>

            <select {...propsRest}>
                {children}
            </select>
        </label>
    )
}

export default SelectWithLabel