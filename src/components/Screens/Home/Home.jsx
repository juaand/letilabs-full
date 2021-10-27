import './Home.css'
import React from 'react'
import Header from '../../Header/Header'
import Video from '../../Video/Video'

function Home() {
    return (
        <>
            <Header />
            <main>
                <Video />
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
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home
