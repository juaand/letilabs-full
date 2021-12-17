import './BottomCta.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'

function BottomCta() {
    return (
        <section className="container-fluid BottomCta">
            <div className="row">
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__equipo" />
                    <div className="BottomCta__title">
                        <Fade direction="up" triggerOnce>
                            <h2>Impulsados por el propósito y compromiso</h2>
                            <Link to="/" className="leti-btn" rel="noopener noreferrer">Conoce a nuestra gente</Link>
                        </Fade>
                    </div>
                </div>
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__novedades" />
                    <div className="BottomCta__title">
                        <Fade cascade delay={300} direction="up" triggerOnce>
                            <h2>Entérate de las novedades</h2>
                            <Link to="/" className="leti-btn" rel="noopener noreferrer">Lee más</Link>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BottomCta
