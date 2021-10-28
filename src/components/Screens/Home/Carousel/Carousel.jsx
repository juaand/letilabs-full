import './Carousel.css'
import React, {useState, useEffect} from 'react'
import Slider from "react-slick"
import homeCarousel from '../../../../data/homeCarousel'


function Carousel() {
    let initSettings = {
        className: "center",
        centerMode: true,
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3
    }

    const [settings, setSettings] = useState(initSettings)

    useEffect(() => {
        if (window.screen.width <= 576) {
            initSettings.arrows = false
            initSettings.slidesToShow = 1
            setSettings(initSettings)
        } else {
            initSettings.arrows = true
            initSettings.slidesToShow = 3
            setSettings(initSettings)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container-fluid Carousel">
            <Slider {...settings}>
                {homeCarousel.map(el =>
                    <>
                        <div className="Carousel__product">
                            <div className="Carousel__image" style={{
                                background: `url("./images/${el.name.toLowerCase()}.png") no-repeat center center / contain`
                            }}></div>
                            <h3 className="Carousel__desc">{el.desc}</h3>
                        </div>
                    </>
                )}
            </Slider>
        </div>
    )
}

export default Carousel
