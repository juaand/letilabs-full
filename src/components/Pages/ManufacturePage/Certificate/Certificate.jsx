import './Certificate.css'
import React, {useState, useEffect} from 'react'
import Slider from 'react-slick'
import {getCertificatesManufacture} from '../../../../services/ApiClient'
import {Fade} from 'react-awesome-reveal'

function Certificate() {

    const [certificados, setCertificados] = useState([])

    let settings = {
        slidesToShow: 1,
        speed: 500,
        dots: false,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
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
            const getCertificates = await getCertificatesManufacture([])
            setCertificados(getCertificates)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fade triggerOnce direction="up">
            <section className="container-fluid Certificate">
                <div className="Certificate__img">
                    <Slider {...settings}>
                        {certificados?.map(el =>
                            <>
                                <img src={el?.imgURL} alt={el?.title} />
                            </>
                        )}
                    </Slider>
                </div>
                <main className="container Certificate__visible">
                    <div className="row">
                        <div className="col-12 offset-sm-6 col-sm-6 Certificate__info">
                            <h1>{certificados[0]?.title}</h1>
                            <p dangerouslySetInnerHTML={{__html: certificados[0]?.desc}} />
                        </div>
                    </div>
                </main>
            </section>
        </Fade>
    )
}

export default Certificate
