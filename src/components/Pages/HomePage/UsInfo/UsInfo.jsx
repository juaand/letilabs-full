import './UsInfo.css'
import React from 'react'
import {Link} from 'react-router-dom'

function UsInfo() {

    return (
        <section className="container Nosotros">
            <div className="row">
                <div className="col-11 col-sm-6">
                    <p className="Nosotros__valor">
                        <span className="blue-text">Laboratorios Leti</span> es un laboratorio
                        farmacéutico venezolano que desde hace 70 años, crea soluciones de
                        salud a través de la producción y comercialización de un amplio
                        portafolio de medicamentos desarrollados con tecnología y
                        seguridad, de la mano de un talento humano caliﬁcado que trabaja
                        día a día para acompañar a los venezolanos.
                    </p>
                    <Link to={{
                        pathname: '/sobre-nosotros'
                    }} className="leti-btn">Conoce más sobre nosotros
                    </Link>
                </div>
                <div className="leti-blue-triangle parallax-rotate" data-speed="-.1" data-axis="vertical"></div>
                <div className="leti-red-triangle parallax-rotate" data-speed=".05" data-axis="vertical"></div>
            </div>
        </section>
    )
}

export default UsInfo
