import './Carousel.css'
import React, {useEffect} from 'react'
import Slider from "react-slick"
import homeCarousel from '../../../../data/homeCarousel'
import {Fade} from "react-awesome-reveal"
import {seoURL} from '../../../../helpers/globals'


function Carousel() {
    let settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        dots: true,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    useEffect(() => {
        const getSlickDots = document.querySelector('.slick-dots').getBoundingClientRect()

        const getNextArrow = document.querySelector('.slick-next')
        const getPrevArrow = document.querySelector('.slick-prev')

        getNextArrow.style.left = `${((getSlickDots.left + getSlickDots.width) / 10) - 16}rem`
        getPrevArrow.style.left = `${(getSlickDots.x / 10) - 27}rem`

        document.querySelector('.slick-dots').style.marginLeft = `-${((getSlickDots.width) / 2) / 10}rem`

    }, [])

    return (
        <Fade delay={800} triggerOnce>
            <section className="Carousel">
                <div className="container">
                    <h1>Nuestros <br />productos</h1>
                </div>
                <div className="container-fluid p-0">
                    <Slider {...settings}>
                        {homeCarousel.map(el =>
                            <div>
                                <div className="Carousel__product">
                                    <div className="Carousel__image" style={{
                                        background: `url("./images/${seoURL(el.name)}.png") no-repeat center center / contain`
                                    }}></div>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>
            </section>
        </Fade>
    )
}

export default Carousel
