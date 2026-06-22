import type { ReactNode } from "react"
import ReactModal from "react-modal"
import styles from "./Modal.module.css"

ReactModal.setAppElement("#root")

type Props = {
    children: ReactNode
    isOpen: boolean
    onRequestClose: () => void
    onAfterClose?: () => void
}

const MODAL_CLOSE_TIMEOUT = 300

const Modal = ({ children, isOpen, onRequestClose, onAfterClose }: Props) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onAfterClose={onAfterClose}
            closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
            className={styles.modal}
            overlayClassName={styles.modal__overlay}
            shouldCloseOnEsc>
            {children}
        </ReactModal>
    )
}

export default Modal