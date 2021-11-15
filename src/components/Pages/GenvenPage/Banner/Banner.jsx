import './Banner.css'
import React from 'react'

function Banner() {

    return (
        <section className="container-fluid Banner__Genven">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Genven__title">
                        <img className="Banner__Genven-logo" src="./images/genven.svg" alt="Leti" />
                        <h3><span className="blue-text">Genven Genéricos Venezolanos,</span> es nuestra línea de
                            genéricos de Laboratorios Leti S.A.V, con más de 25
                            años en el mercado farmacéutico venezolano.<br /><br />

                            Esta planta de manufactura cuenta con <span className="blue-text">tecnología de punta y estrictos controles de calidad</span> en el proceso de fabricación de sus productos, lo que se traduce en medicamentos de comprobada eficacia terapéutica, que cumplen con los rigurosos controles exigidos por las Autoridades Sanitarias nacionales.</h3>
                    </div>
                    <div className="Banner__Genven__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                    <div className="Banner__Genven__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                </div>
            </div>
        </section>
    )
}

export default Banner
