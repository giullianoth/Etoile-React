import type { CSSProperties, ReactNode } from "react"
import styles from "./Grid.module.css"
import { useWindowBehavior } from "../../hooks/useWindowBehavior"

type Props = {
    children?: ReactNode
    className?: string
    gap?: number
    columns: number
    narrow?: boolean
}

const Grid = ({ columns, children, className, gap, narrow }: Props) => {
    const { windowSize } = useWindowBehavior()

    const gridStyles: CSSProperties = {
        gridTemplateColumns: windowSize >= 992 ? `repeat(${columns}, 1fr)` : "",
        gap: gap ? `${gap}px` : "20px"
    }

    return (
        <div
            style={gridStyles}
            className={styles.grid + (className ? ` ${className}` : "") + (narrow ? ` ${styles.narrow}` : "")}>
            {children}
        </div>
    )
}

export default Grid