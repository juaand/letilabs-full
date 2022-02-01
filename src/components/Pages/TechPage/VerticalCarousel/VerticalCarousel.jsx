import React, {useState} from "react"
import cn from "classnames"
import {ReactComponent as Next} from "../../../../images/next-arrow.svg"
import {ReactComponent as Prev} from "../../../../images/prev-arrow.svg"
import "./VerticalCarousel.css"
import areasTeraData from "../../../../data/areasTeraData"


const VerticalCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    // Used to determine which items appear above the active item
    const halfwayIndex = Math.ceil(areasTeraData.length / 2)

    // Usd to determine the height/spacing of each item
    const itemHeight = 52

    // Used to determine at what point an item is moved from the top to the bottom
    const shuffleThreshold = halfwayIndex * itemHeight

    // Used to determine which items should be visible. this prevents the "ghosting" animation
    const visibleStyleThreshold = shuffleThreshold / 2

    const determinePlacement = (itemIndex) => {
        // If these match, the item is active
        if (activeIndex === itemIndex) return 0

        if (itemIndex >= halfwayIndex) {
            if (activeIndex > itemIndex - halfwayIndex) {
                return (itemIndex - activeIndex) * itemHeight
            } else {
                return -(areasTeraData.length + activeIndex - itemIndex) * itemHeight
            }
        }

        if (itemIndex > activeIndex) {
            return (itemIndex - activeIndex) * itemHeight
        }

        if (itemIndex < activeIndex) {
            if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
                return (areasTeraData.length - (activeIndex - itemIndex)) * itemHeight
            }
            return -(activeIndex - itemIndex) * itemHeight
        }
    }

    const handleClick = (direction) => {
        setActiveIndex((prevIndex) => {
            if (direction === "next") {
                if (prevIndex + 1 > areasTeraData.length - 1) {
                    return 0
                }
                return prevIndex + 1
            }

            if (prevIndex - 1 < 0) {
                return areasTeraData.length - 1
            }

            return prevIndex - 1
        })
    }

    return (
        <div className="container-fluid VerticalCarousel">
            <section className="outer-container container-fluid">
                <div className="row">
                <div className="col-8 offset-4">
                    <h1>Secciones relevantes</h1>
                </div>
                    <div className="carousel-wrapper col-4">
                        <button
                            type="button"
                            className="carousel-button prev"
                            onClick={() => handleClick("prev")}
                        >
                            <Prev />
                        </button>

                        <div className="carousel">
                            <div className="slides">
                                <div className="carousel-inner">
                                    {areasTeraData.map((item, i) => (
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex(i)}
                                            className={cn("carousel-item", {
                                                active: activeIndex === i,
                                                visible:
                                                    Math.abs(determinePlacement(i)) <= visibleStyleThreshold
                                            })}
                                            key={item.id}
                                            style={{
                                                transform: `translateY(${determinePlacement(i)}px)`
                                            }}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="carousel-button next"
                            onClick={() => handleClick("next")}
                        >
                            <Next />
                        </button>
                    </div>
                    <div className="content col-8 p-0">
                        <div className="content-img" style={{
                            background: `url(./images/${areasTeraData[activeIndex].imgURL}) no-repeat center center / cover`
                        }} />
                        <p>{areasTeraData[activeIndex].desc}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default VerticalCarousel
