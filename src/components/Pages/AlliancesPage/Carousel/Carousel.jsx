import './Carousel.css'
import React, {useState, useEffect} from 'react'
import Slider from "react-slick"
import {Fade} from "react-awesome-reveal"
import {getLogoCarouselData} from '../../../../services/ApiClient'

function Carousel() {

    const [getData, setGetData] = useState([])

    let settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        dots: false,
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
        const fetchData = async () => {
            const data = await getLogoCarouselData()
            setGetData(data)
        }
        fetchData()

    }, [])

    return (
        <>
            {
                getData.length >= 4 &&
                <Fade delay={800} triggerOnce>
                    <section className="Carousel__Alliances">
                        <div className="container">
                            <h1>Nuestros aliados en el tiempo</h1>
                        </div>
                        <div className="container-fluid p-0">
                            <Slider {...settings}>
                                {getData.map(el =>
                                    <div>
                                        <div className="Carousel__Alliances__product">
                                            <div className="Carousel__Alliances__image" style={{
                                                background: `url("${el.picPath}") no-repeat center center / contain`
                                            }}></div>
                                        </div>
                                    </div>
                                )}
                            </Slider>
                        </div>
                    </section>
                </Fade>
            }
        </>
    )
}

export default Carousel
