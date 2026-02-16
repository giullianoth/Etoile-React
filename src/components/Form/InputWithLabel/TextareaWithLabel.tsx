import type { ComponentProps, ReactNode } from "react"
import styles from "./InputWithLabel.module.css"

interface Props extends ComponentProps<"textarea"> {
    label: string
    children?: ReactNode
}

const TextareaWithLabel = (props: Props) => {
    const { label, children, ...propsRest } = props

    return (
        <label className={styles.input}>
            <span className={styles.input__label}>
                <strong>
                    {label}
                    {propsRest.required && " *"}
                </strong>
            </span>

            <textarea {...propsRest}>
                {children}
            </textarea>
        </label>
    )
}

export default TextareaWithLabel