import './BottomCta.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'

function BottomCta() {
    return (
        <section className="container-fluid BottomCta">
            <div className="row">
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__portfolio" />
                    <div className="BottomCta__title">
                        <Fade direction="up" triggerOnce>
                            <h2>Conoce nuestro amplio portafolio</h2>
                            <Link to="/" className="leti-btn" rel="noopener noreferrer">Listado de productos</Link>
                        </Fade>
                    </div>
                </div>
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__investigacion" />
                    <div className="BottomCta__title">
                        <Fade cascade delay={300} direction="up" triggerOnce>
                            <h2>Nos apasionan las nuevas ideas y la innovación
                            </h2>
                            <Link to="/" className="leti-btn" rel="noopener noreferrer">Conoce nuestra investigación</Link>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BottomCta
