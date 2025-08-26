import { PiCaretLeft, PiCaretRight } from "react-icons/pi"
import styles from "./ListButton.module.css"
import type { MouseEventHandler } from "react"

type Props = {
    direction: "prev" | "next"
    onClick?: MouseEventHandler
}

const ListButton = ({ direction, onClick }: Props) => {
    return (
        <div
            className={`button primary ${styles.button} ${styles[direction]}`}
            onClick={onClick}>
            {direction === "prev" && <PiCaretLeft />}
            {direction === "next" && <PiCaretRight />}
        </div>
    )
}

export default ListButton