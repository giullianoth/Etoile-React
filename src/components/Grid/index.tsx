import type { CSSProperties, ReactNode } from "react"
import styles from "./Grid.module.css"
import { useWindowBehavior } from "../../hooks/window-behavior"

type Props = {
    children: ReactNode
    columns: number
    gap?: number
    narrow?: boolean
}

const Grid = ({ children, columns, gap, narrow }: Props) => {
    const { windowSize, breakpointLarge } = useWindowBehavior()

    const gridStyles: CSSProperties = {
        gridTemplateColumns: windowSize >= breakpointLarge ? `repeat(${columns}, 1fr)` : "",
        gap: gap ? `${gap}px` : 0
    }

    return (
        <div
            className={styles.grid + (narrow ? ` ${styles.narrow}` : "")}
            style={gridStyles}>
            {children}
        </div>
    )
}

export default Grid