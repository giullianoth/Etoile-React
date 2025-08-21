import { useState } from "react"

export const useWindowBehavior = () => {
    const [scrolling, setScrolling] = useState<boolean>(window.scrollY > 0)
    window.addEventListener("scroll", () => setScrolling(window.scrollY > 0))
    return scrolling
}