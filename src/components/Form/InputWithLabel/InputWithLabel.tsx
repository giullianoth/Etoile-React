import type { ComponentProps } from "react"
import styles from "./InputWithLabel.module.css"

interface Props extends ComponentProps<"input"> {
    label: string
}

const InputWithLabel = (props: Props) => {
    const { label, ...propsRest } = props

    return (
        <label className={styles.input}>
            <span className={styles.input__label}>
                <strong>
                    {label}
                    {propsRest.required && " *"}
                </strong>
            </span>

            <input {...propsRest} />
        </label>
    )
}

export default InputWithLabel