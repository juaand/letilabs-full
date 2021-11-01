import './Carousel.css'
import React, {useState, useEffect} from 'react'
import Slider from "react-slick"
import homeCarousel from '../../../../data/homeCarousel'


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


    return (
        <>
            <div className="container">
                <h1>Nuestro <br />productos</h1>
            </div>
            <div className="container-fluid Carousel">
                <Slider {...settings}>
                    {homeCarousel.map(el =>
                        <>
                            <div className="Carousel__product">
                                <div className="Carousel__image" style={{
                                    background: `url("./images/${el.name.toLowerCase()}.png") no-repeat center center / contain`
                                }}></div>
                            </div>
                            <h3 className="Carousel__desc">{el.desc}</h3>
                        </>
                    )}
                </Slider>
            </div>
        </>
    )
}

export default Carousel
