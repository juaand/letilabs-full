import React, {useState, useEffect} from "react"
import {Fade} from "react-awesome-reveal"
import Slider from 'react-slick'
import cn from "classnames"

import {ReactComponent as Next} from "../../../../images/next-arrow.svg"
import {ReactComponent as Prev} from "../../../../images/prev-arrow.svg"
import {getCarouselTech} from "../../../../services/ApiClient"
import Loader from "../../../Loader/Loader"
import "./VerticalCarousel.css"

const VerticalCarousel = () => {

    let settings = {
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    className: "center",
                    centerMode: true,
                    infinite: true,
                    centerPadding: "0px",
                    speed: 500,
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const [areasTeraData, setAreasTeraData] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    // Used to determine which items appear above the active item
    const halfwayIndex = Math.ceil(areasTeraData?.length / 2)

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
                return -(areasTeraData?.length + activeIndex - itemIndex) * itemHeight
            }
        }

        if (itemIndex > activeIndex) {
            return (itemIndex - activeIndex) * itemHeight
        }

        if (itemIndex < activeIndex) {
            if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
                return (areasTeraData?.length - (activeIndex - itemIndex)) * itemHeight
            }
            return -(activeIndex - itemIndex) * itemHeight
        }
    }

    const handleClick = (direction) => {
        setActiveIndex((prevIndex) => {
            if (direction === "next") {
                if (prevIndex + 1 > areasTeraData?.length - 1) {
                    return 0
                }
                return prevIndex + 1
            }

            if (prevIndex - 1 < 0) {
                return areasTeraData?.length - 1
            }

            return prevIndex - 1
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const getCarouselData = await getCarouselTech()
            setAreasTeraData(getCarouselData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Fade className="d-none d-sm-block" triggerOnce direction="up">
                <div className="container-fluid VerticalCarousel">
                    <section className="outer-container container-fluid">
                        <div className="row">
                            <div className="col-8 offset-4">
                                <h1>{areasTeraData[0]?.mainTitle}</h1>
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
                                            {areasTeraData?.map((item, i) => (
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveIndex(i)}
                                                    className={cn("carousel-item", {
                                                        active: activeIndex === i,
                                                        visible:
                                                            Math.abs(determinePlacement(i)) <= visibleStyleThreshold
                                                    })}
                                                    key={item?.id}
                                                    style={{
                                                        transform: `translateY(${determinePlacement(i)}px)`
                                                    }}
                                                >
                                                    {item?.title}
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
                                    background: `url(${areasTeraData[activeIndex]?.imgURL}) no-repeat center center / cover`
                                }} />
                                <p dangerouslySetInnerHTML={{__html: areasTeraData[activeIndex]?.description}} />
                            </div>
                        </div>
                    </section>
                </div>
            </Fade>
            {/* Responsive */}
            <Fade triggerOnce direction="up" className="container-fluid  VerticalCarousel d-block d-sm-none">
                <div className="row justify-content-center">
                    <h1 className="w-margin">Secciones relevantes</h1>
                    <Slider {...settings}>
                        {areasTeraData?.map(el =>
                            <div className="VerticalCarousel__card">
                                <div className="VerticalCarousel__card-img" style={{
                                    background: `url(${el?.imgURL}) no-repeat center / cover`
                                }} />
                                <div className="VerticalCarousel__card-body">
                                    <h3>{el?.title}</h3>
                                    <p className="VerticalCarousel__card-text" dangerouslySetInnerHTML={{__html: el?.description}}>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>
            </Fade>
        </>
    )
}

export default VerticalCarousel
