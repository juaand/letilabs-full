import './InfoCards.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import Slider from 'react-slick'
import {getInfoCardsOurPhilosophy} from '../../../../services/ApiClient'


function InfoCards() {

    const [dataOurPhilosophy, setDataOurPhilosophy] = useState()

    let settings = {
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    className: "center",
                    centerMode: true,
                    infinite: true,
                    centerPadding: "0px",
                    speed: 500,
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    useEffect(() => {
        const fetchData = async () => {
            const getInfoCardsData = await getInfoCardsOurPhilosophy()
            setDataOurPhilosophy(getInfoCardsData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <section className="container InfoCards d-none d-sm-block">
                <div className="row justify-content-around">
                    <Fade className="col" cascade delay={300} direction="up" triggerOnce>
                        {dataOurPhilosophy?.map(el =>
                            <div className="InfoCards__OurPhilosophy__cards" style={{
                                background: `url(${el?.picPath}) no-repeat center center / cover`,
                            }}>
                                <h4>{el?.title}</h4>
                            </div>
                        )}
                    </Fade>
                </div>
            </section>

            {/* Responsive */}
            <section className="container-fluid InfoCards__OurPhilosophy d-block d-sm-none">
                <div className="row justify-content-center">
                    <Slider {...settings}>
                        {dataOurPhilosophy?.map(el =>
                            <>
                                <div className="InfoCards__OurPhilosophy__cards" style={{
                                    background: `url(${el?.picPath}) no-repeat center center / cover`,
                                }}>
                                    <h4>{el?.title}</h4>
                                </div>
                            </>
                        )}
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default InfoCards
