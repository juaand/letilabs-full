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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Fade delay={800} triggerOnce>
                <section className="Carousel__Alliances">
                    <div className="container">
                        <h1>{getData[0]?.title}</h1>
                    </div>
                    <div className="container-fluid p-0">
                        {getData.length >= 4 ?
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
                            :
                            <div className="container">
                                <div className="row justify-content-center align-items-center Carousel__Alliances__alone">
                                    {getData.map(el =>
                                        <div className="col-4 d-flex justify-content-center">
                                            <img src={el.picPath} onerror="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt="" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </Fade>

        </>
    )
}

export default Carousel
