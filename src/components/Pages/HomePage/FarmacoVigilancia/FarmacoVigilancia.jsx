import './FarmacoVigilancia.css'
import React, {useState} from 'react'
import ModalFarmacoVigilancia from '../ModalFarmacoVigilancia/ModalFarmacoVigilancia'

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
                            <h2>Contamos con los especialistas más dedicados</h2>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 p-0 FarmacoVigilancia__img">
                        <div className="FarmacoVigilancia__espacio" />
                        <div className="FarmacoVigilancia__title">
                            <h2>Somos el espacio ideal para crecer</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container FarmacoVigilancia__form">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-6 FarmacoVigilancia__texto">
                        <strong>Farmacovigilancia</strong>
                        <p>¿Tuviste algún efecto adverso<br />
                            con alguno de nuestro productos? </p>
                    </div>
                    <div className="col-11 col-sm-6">
                        <div className="leti-btn" onClick={showModal}>Infórmanos aquí</div>
                    </div>
                </div>
            </section>
            {bool && <ModalFarmacoVigilancia hideModal={() => setBool(!bool)} />}
        </>
    )
}

export default FarmacoVigilancia
