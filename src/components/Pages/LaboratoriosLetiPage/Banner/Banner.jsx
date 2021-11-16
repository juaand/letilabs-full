import './Banner.css'
import React from 'react'

function Banner() {

    return (
        <section className="container-fluid Banner__Leti">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Leti__title">
                        <img className="Banner__Leti-logo" src="./images/laboratorios-leti.svg" alt="Leti" />
                        <h3>Esta es la unidad que se encarga de desarrollar la gama de productos que abarca diferentes áreas terapéuticas: cardiovascular, metabolismo, gástrica, respiratoria, neurológicas, músculo-esqueléticas, dolor, antibióticos, vitaminas, tanto para el paciente pediátrico como para el paciente adulto.</h3>
                    </div>
                    <div className="Banner__Leti__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                    <div className="Banner__Leti__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                </div>
            </div>
        </section>
    )
}

export default Banner