import { useState } from "react"
import styles from "./Grid.module.css"

const Grid = ({ children, className, columns, gap, collapsed }) => {
    const [largeScreen, setLargeScreen] = useState(window.innerWidth >= (columns === 1 ? 768 : 992))
    window.addEventListener("resize", () => setLargeScreen(window.innerWidth >= (columns === 1 ? 768 : 992)))

    const gridStyle = {
        gridTemplateColumns: largeScreen ? `repeat(${columns}, 1fr)` : "",
        gap: `${gap}px`
    }

    return (
        <div
            style={gridStyle}
            className={styles.grid + (className ? ` ${className}` : "") + (collapsed ? ` ${styles.gridCollapsed}` : "")}>
            {children}
        </div>
    )
}

export default Grid