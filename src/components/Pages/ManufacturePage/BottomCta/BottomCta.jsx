import './BottomCta.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function BottomCta() {
    return (
        <section className="container-fluid BottomCta">
            <div className="row">
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__talento" />
                    <div className="BottomCta__title">
                        <Fade direction="up" triggerOnce>
                            <h2>Conoce al talento que hace todo posible</h2>
                        </Fade>
                    </div>
                </div>
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__megat" />
                    <div className="BottomCta__title">
                        <Fade cascade delay={300} direction="up" triggerOnce>
                            <h2>Conoce la empresa homóloga de Leti en Ecuador
                            </h2>
                            <a href="https://megat.com.ec/" target="_blank" className="leti-btn" rel="noopener noreferrer">Visita Megat</a>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BottomCta
