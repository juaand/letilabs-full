import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'

function Banner() {

    return (
        <section className="container-fluid Banner__Products">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-9 Banner__Products__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1>Trabajamos cada día para poner nuestros conocimientos y habilidades al servicio de las personas:</h1>
                            <h3>
                                Desarrollando y poniendo a su disposición productos que abarquen una amplia gama de necesidades.
                            </h3>
                        </Fade>
                    </div>
                    <Fade delay={300} direction="down" triggerOnce className="col-12 Banner__Products__btns">
                        <div className="row">
                            <Link to="/listado-de-productos" className="col-12 col-sm-3 col-lg-3 leti-btn">Conoce todos los productos</Link>
                            <Link to="/areas-terapeuticas" className="col-12 col-sm-3 col-lg-3  leti-btn">Descubre nuestras áreas terapéuticas</Link>
                        </div>
                    </Fade>
                    <Fade cascade delay={1500} triggerOnce>
                        <div className="Banner__Products__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__Products__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
