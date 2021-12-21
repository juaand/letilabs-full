import './Bottom.css'
import React from 'react'
import {Fade} from "react-awesome-reveal"
import {Link} from 'react-router-dom'

function Bottom() {
    return (
        <section className="container-fluid Bottom">
            <div className="row">
                <Fade triggerOnce delay={400} direction="up">
                    <div className="Bottom__blue-stroke parallax-rotate" data-speed="0.1" />
                </Fade>
                <Fade direction="left" triggerOnce>
                    <div className="col-12 col-sm-6 Bottom__clip" />
                </Fade>
                <div className="col-11 col-sm-5 offset-sm-6 Bottom__info">
                    <Fade direction="down" triggerOnce>
                        <h1>¿Buscas una oportunidad de crecimiento?</h1>
                    </Fade>
                    <p className="Bottom__desc">¡Siempre estamos en busca de nuevos talentos!<br />
                        Encuentra posiciones abiertas</p>
                    <Link to="/" className="leti-btn">Consultar</Link>
                </div>
            </div>
        </section>
    )
}

export default Bottom
