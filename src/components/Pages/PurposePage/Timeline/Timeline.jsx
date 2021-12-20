import './Timeline.css'
import React, {useEffect} from 'react'
import Slider from "react-slick"
import purposeTimeline from '../../../../data/purposeTimeline'
import {Fade} from 'react-awesome-reveal'

function Timeline() {

    let settings = {
        slidesToShow: 1,
        speed: 500,
        arrows: true,
        slidesToScroll: 1,
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
        const getAllDesc = Array.from(new Set(document.querySelectorAll('.Timeline__leti__desc')))

        const getDescX = getAllDesc[0].getBoundingClientRect().x

        const getDescsMaxHeight = Math.max(...getAllDesc.map(item => item.offsetHeight))

        const getTimelineHeight = document.querySelector('.Timeline__leti__info').offsetHeight

        const PrevArrow = document.querySelector('.Timeline__leti .slick-prev')
        const NextArrow = document.querySelector('.Timeline__leti .slick-next')

        if (purposeTimeline.length > 1 && window.screen.width > 576) {
            //Arrows top position
            PrevArrow.style.top = `${((getTimelineHeight - getDescsMaxHeight) / 10) - 12}rem`
            NextArrow.style.top = `${((getTimelineHeight - getDescsMaxHeight) / 10) - 12}rem`

            //Prev arrows left position
            PrevArrow.style.left = `${(-getDescX / 10) + 4}rem`
            //Next arrows right position
            NextArrow.style.left = `${(-getDescX / 10) + 14}rem`
        }

    }, [])

    return (
        <Fade direction="up" triggerOnce>
            <section className="container-fluid Timeline__leti">
                <Slider {...settings}>
                    {purposeTimeline.map(el =>
                        <>
                            <div className="Timeline__leti__product row">
                                <div className="Timeline__leti__image col-12 col-sm-6" style={{
                                    background: `url("./images/${el.imgURL}") no-repeat left center / cover`
                                }}></div>
                                <div className="col-12 col-sm-6 Timeline__leti__info">
                                    <div className="row">
                                        <p className="col-12 col-sm-8 Timeline__leti__desc" dangerouslySetInnerHTML={{__html: el.desc}}>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Slider>
            </section>
        </Fade>
    )
}

export default Timeline