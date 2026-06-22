import type { ComponentProps } from "react"
import styles from "./InputWithLabel.module.css"
import Password from "../Password"

interface Props extends ComponentProps<"input"> {
    label: string
}

const PasswordWithLabel = (props: Props) => {
    const { label, ...propsRest } = props

    return (
        <label className={styles.input}>
            <span className={styles.input__label}>
                <strong>
                    {label}
                    {propsRest.required && " *"}
                </strong>
            </span>

            <Password {...propsRest} />
        </label>
    )
}

export default PasswordWithLabel