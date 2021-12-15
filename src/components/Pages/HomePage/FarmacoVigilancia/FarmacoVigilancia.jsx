import './FarmacoVigilancia.css'
import React, {useState} from 'react'
import ModalFarmacoVigilancia from '../ModalFarmacoVigilancia/ModalFarmacoVigilancia'
import {Fade} from 'react-awesome-reveal'

function FarmacoVigilancia() {

    const [bool, setBool] = useState(false)

    const showModal = () => {
        setBool(!bool)
    }

    return (
        <>
            <section className="container-fluid FarmacoVigilancia">
                <div className="row">
                    <div className="col-12 col-sm-6 p-0 FarmacoVigilancia__img">
                        <div className="FarmacoVigilancia__especialistas" />
                        <div className="FarmacoVigilancia__title">
                            <Fade direction="up" triggerOnce>
                                <h2>Contamos con los especialistas más dedicados</h2>
                            </Fade>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 p-0 FarmacoVigilancia__img">
                        <div className="FarmacoVigilancia__espacio" />
                        <div className="FarmacoVigilancia__title">
                            <Fade delay={300} direction="up" triggerOnce>
                                <h2>Somos el espacio ideal para crecer</h2>
                            </Fade>
                        </div>
                    </div>
                </div>
            </section>
            <Fade direction="up" triggerOnce>
                <section className="container FarmacoVigilancia__form">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-6 FarmacoVigilancia__texto">
                            <strong>Farmacovigilancia</strong>
                            <p>¿Tiene algún comentario o efecto adverso<br />
                                de alguno de nuestro productos?
                                <br />
                                ¡Su opinión es importante para nosotros! </p>
                        </div>
                        <div className="col-11 col-sm-6 d-flex align-items-center">
                            <div className="leti-btn" onClick={showModal}>Infórmanos aquí</div>
                        </div>
                    </div>
                </section>
            </Fade>
            {bool && <ModalFarmacoVigilancia hideModal={() => setBool(!bool)} />}
        </>
    )
}

export default FarmacoVigilancia
