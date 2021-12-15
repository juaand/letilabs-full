import './MarcandoPauta.css'
import React from 'react'
import {Fade} from "react-awesome-reveal"

function MarcandoPauta() {
    return (
        <section className="container-fluid MarcandoPauta">
            <div className="row justify-content-between">
                <div className="col-12 col-sm-5 MarcandoPauta__text">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-9 offset-sm-5">
                            <Fade direction="down" triggerOnce>
                                <p>
                                    Contamos con el mejor talento que con su <span className="blue-text">ingenio</span> e <span className="blue-text">increíble calidad humana,</span> trabajan muy comprometidos día a día por los venezolanos, velando por la salud de todo un país.
                                </p>
                            </Fade>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 MarcandoPauta__bg"></div>
            </div>
        </section>
    )
}

export default MarcandoPauta
