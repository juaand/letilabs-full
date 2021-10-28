import './UsInfo.css'
import React from 'react'
import {Link} from 'react-router-dom'

function UsInfo() {

    return (
        <section class="container Nosotros">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <p class="Nosotros__valor">
                        <span class="blue-text">Laboratorios Leti</span> es un laboratorio
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
                <div className="leti-blue-triangle parallax" data-speed="-.3" data-axis="vertical"></div>
                <div className="leti-red-triangle parallax" data-speed=".3" data-axis="horizontal"></div>

            </div>
        </section>
    )
}

export default UsInfo
