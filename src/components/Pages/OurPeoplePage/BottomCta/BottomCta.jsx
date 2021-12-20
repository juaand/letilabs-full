import './BottomCta.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'

function BottomCta() {
    return (
        <section className="container-fluid BottomCta">
            <div className="row">
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__instalaciones" />
                    <div className="BottomCta__title">
                        <Fade direction="up" triggerOnce>
                            <h2>Conoce donde trabajamos</h2>
                            <Link to="/" className="leti-btn">Nuestras instalaciones</Link>
                        </Fade>
                    </div>
                </div>
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__empresas" />
                    <div className="BottomCta__title">
                        <Fade cascade delay={300} direction="up" triggerOnce>
                            <h2>Conoce las unidades que forman parte del grupo
                            </h2>
                            <Link to="/" className="leti-btn">Nuestras empresas</Link>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BottomCta
