import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__IYD">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__IYD__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1>Pilares de I&D</h1>
                            <h3>Para nosotros siempre ha sido prioridad contar con la tecnlogía e infraestructura que nos permita desarrollar los mejores productos, y además en las cantidades necesarias para cuidar de la salud de todo el país.</h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={300} triggerOnce>
                        <div className="Banner__IYD__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__IYD__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
