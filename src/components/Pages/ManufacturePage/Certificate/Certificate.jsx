import './Certificate.css'
import React from 'react'
import Slider from 'react-slick'
import certificados from '../../../../data/certificados'

function Certificate() {

    let settings = {
        slidesToShow: 1,
        speed: 500,
        dots: true,
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

    return (
        <section className="container-fluid Certificate">
            <div className="Certificate">(Certificado, sello o documento que avale el cumplimiento)
                <Slider {...settings}>
                    {certificados.map(el =>
                        <>
                            <p>{el?.desc}</p>
                        </>
                    )}
                </Slider>
            </div>
            <main className="container Certificate__visible">
                <div className="row">
                    <div className="col-12 offset-sm-6 col-sm-6 Certificate__info">
                        <h1>Cumplimos con todas las regulaciones</h1>
                        <p>Para producir medicamentos en Venezuela, primero
                            hay que cumplir con varias exigencias para asegurar que el producto sea seguro y de calidad.</p>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Certificate
