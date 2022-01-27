import './Timeline.css'
import React, {useEffect} from 'react'
import Slider from "react-slick"
import seccionesData from '../../../../data/seccionesData'
import {Fade} from "react-awesome-reveal"

function Timeline() {

    let settings = {
        slidesToShow: 1,
        speed: 500,
        arrows: true,
        slidesToScroll: 1,
        vertical: true,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    useEffect(() => {
        const getAllDesc = Array.from(new Set(document.querySelectorAll('.SeccionesTimeline__desc')))

        const getDescX = getAllDesc[0].getBoundingClientRect().x

        const getDescsMaxHeight = Math.max(...getAllDesc.map(item => item.offsetHeight))

        const getTimelineHeight = document.querySelector('.SeccionesTimeline__info').offsetHeight

        const PrevArrow = document.querySelector('.slick-prev')
        const NextArrow = document.querySelector('.slick-next')

        if (seccionesData.length > 1 && window.screen.width > 576) {
            //Arrows top position
            PrevArrow.style.top = `${((getTimelineHeight - getDescsMaxHeight) / 10) - 8}rem`
            NextArrow.style.top = `${((getTimelineHeight - getDescsMaxHeight) / 10) - 8}rem`

            //Prev arrows left position
            PrevArrow.style.left = `${(-getDescX / 10) + 4}rem`
            //Next arrows right position
            NextArrow.style.left = `${(-getDescX / 10) + 14}rem`
        }

    }, [])

    return (
        <Fade triggerOnce>
            <section className="container-fluid SeccionesTimeline">
                <div className="col-12 col-sm-8 offset-sm-4">
                    <h1>Seccciones relevantes</h1>
                </div>
                <Slider {...settings}>
                    {seccionesData.map(el =>
                        <>
                            <div className="SeccionesTimeline__product row">
                                <div className="col-12 col-sm-4 SeccionesTimeline__info">
                                    <div className="SeccionesTimeline__title">{el.title}</div>
                                </div>
                                <div className="SeccionesTimeline__image col-12 col-sm-8" style={{
                                    background: `url("./images/${el.imgURL}") no-repeat center center / cover`
                                }}></div>
                                <p className="col-12 col-sm-8 offset-sm-4 SeccionesTimeline__desc" dangerouslySetInnerHTML={{__html: el.desc}}>
                                </p>
                            </div>
                        </>
                    )}
                </Slider>
            </section>
        </Fade>
    )
}

export default Timeline