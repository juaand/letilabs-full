import './FarmacoVigilancia.css'
import React from 'react'

function FarmacoVigilancia() {
    return (
        <>
            <section className="container-fluid FarmacoVigilancia">
                <div className="row">
                    <div className="col-12 col-sm-6 FarmacoVigilancia__especialistas">Contamos con los especialistas más dedicados</div>
                    <div className="col-12 col-sm-6 FarmacoVigilancia__espacio">Somos el espacio ideal para crecer</div>
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
                        <div className="leti-btn">Infórmanos aquí</div>
                    </div></div>
            </section>
        </>
    )
}

export default FarmacoVigilancia
