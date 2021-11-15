
import './Carousel.css'
import React, {useEffect} from 'react'
import Slider from "react-slick"
import biocontrolledCarousel from '../../../../data/biocontrolledCarousel'


function Carousel() {
    let settings = {
        infinite: true,
        centerPadding: "40px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        dots: false,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: true,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }



    return (
        <section className="Carousel__Biocontrolled">
            <div className="container">
                <h1>Logros <br /> hasta ahora</h1>
            </div>
            <div className="container-fluid p-0">
                <Slider {...settings}>
                    {biocontrolledCarousel.map(el =>
                        <div>
                            <h3 className="col-8 col-sm-4 Carousel__Biocontrolled__desc">
                                {el.info}</h3>
                        </div>
                    )}
                </Slider>
            </div>
        </section>
    )
}

export default Carousel
