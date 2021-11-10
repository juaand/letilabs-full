import './Timeline.css'
import React, {useEffect} from 'react'
import Slider from "react-slick"
import TimelineData from '../../../../data/timeline'

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
        const getAllDesc = Array.from(new Set(document.querySelectorAll('.Timeline__desc')))

        const getDescX = getAllDesc[0].getBoundingClientRect().x

        const getDescsMaxHeight = Math.max(...getAllDesc.map(item => item.offsetHeight))

        const getTimelineHeight = document.querySelector('.Timeline__info').offsetHeight


        const PrevArrow = document.querySelector('.slick-prev')
        const NextArrow = document.querySelector('.slick-next')

        if (window.screen.width > 576) {
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
        <section className="container-fluid Timeline">
            <Slider {...settings}>
                {TimelineData.map(el =>
                    <>
                        <div className="Timeline__product row">
                            <div className="Timeline__image col-12 col-sm-6" style={{
                                background: `url("./images/${el.imgURL}") no-repeat 1rem center / cover`
                            }}></div>
                            <div className="col-12 col-sm-6 Timeline__info">
                                <div className="Timeline__year">{el.year}</div>
                                <div className="row">
                                    <p className="col-12 col-sm-7 Timeline__desc" dangerouslySetInnerHTML={{__html: el.desc}}>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Slider>
        </section>
    )
}

export default Timeline