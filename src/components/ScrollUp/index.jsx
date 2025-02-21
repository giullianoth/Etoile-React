import styles from './ScrollUp.module.css'
import { ArrowUp } from "../../assets/svg/arrow-up"
import { useState } from 'react'

const ScrollUp = () => {
    const [scrolling, setScrolling] = useState(window.scrollY > 0)
    window.addEventListener("scroll", () => setScrolling(window.scrollY > 0))

    const handleScrollUp = () => window.scrollTo(0, 0)

    return (
        <div className={styles.scrollUp + (scrolling ? ` ${styles.scrollUpVisible}` : "")} onClick={handleScrollUp}>
            <ArrowUp />
        </div>
    )
}

export default ScrollUp