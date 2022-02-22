import './Certificate.css'
import React, {useState, useEffect} from 'react'
import Slider from 'react-slick'
import {getCertificatesManufacture} from '../../../../services/ApiClient'
import {Fade} from 'react-awesome-reveal'
import Loader from '../../../Loader/Loader'

function Certificate() {

    const [certificados, setCertificados] = useState([])
    const [loading, setLoading] = useState(true)

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
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Fade triggerOnce direction="up">
                <section className="container-fluid Certificate">
                    <div className="Certificate__img">
                        <Slider {...settings}>
                            {certificados?.map(el =>
                                <>
                                    <img src={el?.imgURL} onerror="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.title} />
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
        </>
    )
}

export default Certificate
