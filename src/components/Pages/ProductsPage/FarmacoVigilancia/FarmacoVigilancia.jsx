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
