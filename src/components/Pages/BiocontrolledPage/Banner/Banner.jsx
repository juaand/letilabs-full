import './Banner.css'
import React from 'react'

function Banner() {

    return (
        <section className="container-fluid Banner__Biocontrolled">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Biocontrolled__title">
                        <img className="Banner__Biocontrolled-logo" src="./images/biocontrolled.svg" alt="Biocontrolled logo" />
                        <h3>Esta es la unidad de explorar nuevas maneras y eficaces maneras de desarrollar medicamentos, gracias a <span className="blue-text">Biocontrolled</span> es que nos mantenemos a la vanguardia y podemos seguir ofreciendo productos cada vez más beneficiosos.</h3>
                    </div>
                    <div className="Banner__Biocontrolled__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                    <div className="Banner__Biocontrolled__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                </div>
            </div>
        </section>
    )
}

export default Banner
