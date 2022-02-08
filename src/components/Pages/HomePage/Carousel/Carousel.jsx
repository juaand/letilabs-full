import './Carousel.css'
import React, {useState, useEffect} from 'react'
import Slider from "react-slick"
import {Fade} from "react-awesome-reveal"
import {getVadevecumData} from '../../../../services/ApiClient'

function Carousel() {

    const [getData, setGetData] = useState([])

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
        const fetchData = async () => {
            const data = await getVadevecumData()
            const dataFiltered = data?.filter(el => el?.show_in_home === true)
            setGetData(dataFiltered)

            if (dataFiltered.length >= 4) {
                const getSlickDots = document.querySelector('.slick-dots').getBoundingClientRect()

                const getNextArrow = document.querySelector('.slick-next')
                const getPrevArrow = document.querySelector('.slick-prev')

                getNextArrow.style.left = `${((getSlickDots?.x + getSlickDots?.width) / 10) + 4}rem`
                getPrevArrow.style.left = `${(getSlickDots?.x / 10) - 8}rem`

                document.querySelector('.slick-dots').style.marginLeft = `-${((getSlickDots?.width) / 2) / 10}rem`
            }
        }
        fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData.length])

    return (
        <>
            {getData.length >= 4 &&
                <Fade delay={800} triggerOnce>
                    <section className="Carousel">
                        <div className="container">
                            <h1>Nuestros <br />productos</h1>
                        </div>
                        <div className="container-fluid p-0">
                            <Slider {...settings}>
                                {getData?.map(el =>
                                    <div>
                                        <div className="Carousel__product">
                                            <div className="Carousel__image" style={{
                                                background: `url("${el?.picPath}") no-repeat center center / contain`
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