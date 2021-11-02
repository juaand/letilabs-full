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
        const getImageWidth = document.querySelector('.Timeline__image').offsetWidth

        document.querySelector('.slick-prev').style.transform = `translate(${(getImageWidth + 50) / 10}rem, 0rem)`

        document.querySelector('.slick-next').style.transform = `translate(${(-getImageWidth * (.08))}rem, 0rem)`

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