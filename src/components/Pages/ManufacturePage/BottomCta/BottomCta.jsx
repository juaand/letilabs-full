import './BottomCta.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'

function BottomCta() {
    return (
        <section className="container-fluid BottomCta">
            <div className="row">
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__terapias" />
                    <div className="BottomCta__title">
                        <Fade direction="up" triggerOnce>
                            <h2>Ofrecemos terapias en las principales especialidades médicas</h2>
                            <Link to="/" className="leti-btn">Nuestras áreas terapéuticas</Link>
                        </Fade>
                    </div>
                </div>
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__medicamento" />
                    <div className="BottomCta__title">
                        <Fade cascade delay={300} direction="up" triggerOnce>
                            <h2>(Medicamento más reciente agregado al proceso de manufactura)
                            </h2>
                            <Link to="/" className="leti-btn">Leer más</Link>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BottomCta
