import { PiCaretLeft, PiCaretRight } from "react-icons/pi"
import styles from "./ListButton.module.css"

type Props = {
    direction: "prev" | "next"
}

const ListButton = ({ direction }: Props) => {
    return (
        <div className={`button primary ${styles.button}`}>
            {direction === "prev" && <PiCaretLeft />}
            {direction === "next" && <PiCaretRight />}
        </div>
    )
}

export default ListButton