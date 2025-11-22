import { useState } from "react"

export const useWindowBehavior = () => {
    const breakpointLarge = 992

    const [scrolling, setScrolling] = useState<boolean>(window.scrollY > 0)
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth)

    window.addEventListener("scroll", () => setScrolling(window.scrollY > 0))
    window.addEventListener("resize", () => setWindowSize(window.innerWidth))

    return { scrolling, windowSize, breakpointLarge }
}