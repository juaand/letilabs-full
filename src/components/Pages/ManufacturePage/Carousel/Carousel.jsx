
import './Carousel.css'
import React, {useState, useEffect} from 'react'
import Slider from "react-slick"
import {Fade} from 'react-awesome-reveal'
import {getCarouselManufacture} from '../../../../services/ApiClient'

function Carousel() {

    const [manufactureCarousel, setManufactureCarousel] = useState([])

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

    useEffect(() => {
        const fetchData = async () => {
            const getCarouselData = await getCarouselManufacture()
            setManufactureCarousel(getCarouselData)
            console.log(getCarouselData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="Carousel__Biocontrolled">
            <div className="container">
                <Fade direction="down" triggerOnce>
                    <h1 delay={1000} dangerouslySetInnerHTML={{__html: manufactureCarousel[0]?.title}} />
                </Fade>
            </div>
            <Fade triggerOnce>
                <div className="container-fluid p-0">
                    <Slider {...settings}>
                        {manufactureCarousel?.map(el =>
                            <div>
                                <h3 className="col-8 col-sm-4 Carousel__Biocontrolled__desc">
                                    {el.info}</h3>
                            </div>
                        )}
                    </Slider>
                </div>
            </Fade>
        </section>
    )
}

export default Carousel
