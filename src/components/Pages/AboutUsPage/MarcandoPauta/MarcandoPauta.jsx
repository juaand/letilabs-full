import './MarcandoPauta.css'
import React from 'react'

function MarcandoPauta() {
    return (
        <section className="container-fluid MarcandoPauta">
            <div className="row">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-sm-5 MarcandoPauta__text">
                            <p>
                                Contamos con un talento humano calificado y cualificado que con su <span className="blue-text">ingenio</span> e <span className="blue-text">increíble calidad humana,</span> trabajan día a día por los venezolanos que velan por su salud y la de los demás
                            </p>
                        </div>
                        <div className="col-12 col-sm-6 MarcandoPauta__bg"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarcandoPauta
