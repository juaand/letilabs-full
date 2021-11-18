import './MarcandoPauta.css'
import React from 'react'
import {Fade, Slide} from "react-awesome-reveal"

function MarcandoPauta() {
    return (
        <section className="container-fluid MarcandoPauta">
            <div className="row justify-content-between">
                <div className="col-12 col-sm-5 MarcandoPauta__text">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-9 offset-sm-5">
                            <Slide direction="down" triggerOnce>
                                <Fade>
                                    <p>
                                        Contamos con un talento humano calificado y cualificado que con su <span className="blue-text">ingenio</span> e <span className="blue-text">increíble calidad humana,</span> trabajan día a día por los venezolanos que velan por su salud y la de los demás
                                    </p>
                                </Fade>
                            </Slide>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 MarcandoPauta__bg"></div>
            </div>
        </section>
    )
}

export default MarcandoPauta
