import './BottomCta.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'

function BottomCta() {
    return (
        <section className="container-fluid BottomCta">
            <div className="row">
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__manufactura" />
                    <div className="BottomCta__title">
                        <Fade direction="up" triggerOnce>
                            <h2>Equipos avanzados que mejoran nuestro proceso productivo</h2>
                            <Link to="/" className="leti-btn" rel="noopener noreferrer">Conoce nuestra manufactura</Link>
                        </Fade>
                    </div>
                </div>
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__equipo" />
                    <div className="BottomCta__title">
                        <Fade cascade delay={300} direction="up" triggerOnce>
                            <h2>Orgullosos de ser un equipo de líderes visionarios</h2>
                            <Link to="/nuestra-filosofia" className="leti-btn" rel="noopener noreferrer">Nuestra filosofía</Link>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BottomCta
