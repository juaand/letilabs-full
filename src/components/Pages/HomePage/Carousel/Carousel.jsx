import './Carousel.css'
import React, {useEffect} from 'react'
import Slider from "react-slick"
import homeCarousel from '../../../../data/homeCarousel'
import {Fade} from "react-awesome-reveal"


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

        getNextArrow.style.right = `${((window.screen.width - getSlickDots.right) / 10) - 10}rem`

        getPrevArrow.style.left = `${(getSlickDots.left / 10) - 10}rem`

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
                                        background: `url("./images/${el.name.toLowerCase()}.png") no-repeat center center / contain`
                                    }}></div>
                                </div>
                                <h3 className="Carousel__desc">{el.desc}</h3>
                            </div>
                        )}
                    </Slider>
                </div>
            </section>
        </Fade>
    )
}

export default Carousel
