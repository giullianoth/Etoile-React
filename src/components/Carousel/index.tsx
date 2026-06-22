import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import styles from "./Carousel.module.css"
import useEmblaCarousel from "embla-carousel-react"
import { PiCaretLeft, PiCaretRight } from "react-icons/pi"
import { useWindowBehavior } from "../../hooks/window-behavior"

type Props = {
    children: ReactNode
    spacing?: number
    itemsToShow: number
}

const Carousel = ({ children, itemsToShow, spacing = 0 }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })
    const carouselContainerRef = useRef<HTMLDivElement>(null)
    const [prevButtonDisabled, setPrevButtonDisabled] = useState<boolean>(true)
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true)
    const { breakpointLarge, breakpointSmall, windowSize } = useWindowBehavior()

    const carouselContainerStyles: CSSProperties = {
        gap: `${spacing}px`
    }

    useEffect(() => {
        const carouselList = carouselContainerRef.current

        if (carouselList) {
            const carouselItems = Array.from(carouselList.children)
            let itemSizeStyle: string

            if (windowSize < breakpointSmall) {
                itemSizeStyle = `calc(100% - ${spacing}px)`
            } else if (windowSize >= breakpointSmall && windowSize < breakpointLarge) {
                itemSizeStyle = `calc(50% - ${spacing + (spacing / 2)}px)`
            } else if (windowSize >= breakpointLarge) {
                itemSizeStyle = `calc(${100 / itemsToShow}% - ${spacing + (spacing / itemsToShow)}px)`
            }

            carouselItems.forEach(item => item.setAttribute(
                "style",
                `flex: 0 0 ${itemSizeStyle}`
            ))
        }
    }, [spacing, breakpointLarge, breakpointSmall, itemsToShow, windowSize])

    useEffect(() => {
        const onSelect = () => {
            if (emblaApi) {
                setPrevButtonDisabled(!emblaApi.canScrollPrev())
                setNextButtonDisabled(!emblaApi.canScrollNext())
            }
        }

        onSelect()

        if (emblaApi) {
            emblaApi.on("reInit", onSelect).on("select", onSelect)
        }
    }, [emblaApi])

    const goToPrev = () => {
        if (emblaApi) {
            emblaApi.scrollPrev()
        }
    }

    const goToNext = () => {
        if (emblaApi) {
            emblaApi.scrollNext()
        }
    }

    return (
        <div className={styles.carousel}>
            <div ref={emblaRef} className={styles.carousel__viewport}>
                <div
                    className={styles.carousel__container}
                    style={carouselContainerStyles}
                    ref={carouselContainerRef}>
                    {children}
                </div>
            </div>

            {!prevButtonDisabled &&
                <button
                    onClick={goToPrev}
                    className={`button primary ${styles.carousel__navigation} ${styles.prev}`}>
                    <PiCaretLeft />
                </button>}

            {!nextButtonDisabled &&
                <button
                    onClick={goToNext}
                    className={`button primary ${styles.carousel__navigation} ${styles.next}`}>
                    <PiCaretRight />
                </button>}
        </div>
    )
}

export default Carousel