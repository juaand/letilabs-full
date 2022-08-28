import React, {useEffect} from 'react'
import {Fade} from "react-awesome-reveal"

import './InfoBanner.css'


function InfoBanner() {

    useEffect(() => {
        const counters = document.querySelectorAll('.value')
        const speed = 200

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('akhi')
                const data = +counter.innerText

                const time = value / speed
                if (data < value) {
                    counter.innerText = Math.ceil(data + time)
                    setTimeout(animate, 1)
                } else {
                    counter.innerText = value
                }

            }

            animate()
        })

    }, [])

    return (
        <section className="container-fluid InfoBannerID">
        <div className="InfoBannerID-data col-12">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 col-sm-3 InfoBanner-aside">
                                <div className="row">
                                    <Fade duration={600} delay={300} triggerOnce>
                                        <div className="col-12 text"><span className="value  InfoBannerID-colaboradores InfoBannerID-colaboradores-parque" akhi="75000">0</span>mts <span className="InfoBannerID-colaboradores-texto">Parque Industrial</span></div>
                                        <div className="col-12 custom-margin"><span className="value    InfoBannerID-colaboradores InfoBannerID-colaboradores-almacen" akhi="1">0</span> <span className="InfoBannerID-colaboradores-texto">Almacén Robotizado<br/> Cap. Movilizar +16 mm unidades</span></div>
                                    </Fade>
                                </div>
                            </div>
                            <div className="col-6 col-sm-3 InfoBanner-aside">
                                <div className="row">
                                    <Fade duration={600} delay={300} triggerOnce>
                                        <div className="col-12 text"><span className="value  InfoBannerID-colaboradores InfoBannerID-colaboradores-centros" akhi="2">0</span> <span className="InfoBannerID-colaboradores-texto">Centros de I+D</span></div>
                                        <div className="col-12 custom-margin"><span className="value    InfoBannerID-colaboradores InfoBannerID-colaboradores-desarrollos" akhi="60">0</span> <span className="InfoBannerID-colaboradores-texto">Nuevos Desarrollos</span></div>
                                    </Fade>
                                </div>
                            </div>

                            <div className="col-6 col-sm-3 InfoBanner-aside">
                                <div className="row">
                                    <Fade duration={600} delay={300} triggerOnce>
                                        <div className="col-12 text"><span className="value  InfoBannerID-colaboradores InfoBannerID-colaboradores-lineas" akhi="22">0</span> <span className="InfoBannerID-colaboradores-texto">Líneas de Producción</span></div>
                                        <div className="col-12 custom-margin"><span className="value    InfoBannerID-colaboradores InfoBannerID-colaboradores-formas" akhi="15">0</span> <span className="InfoBannerID-colaboradores-texto">Formas Farmacéuticas</span></div>
                                    </Fade>
                                </div>
                            </div>
                            <div className="col-6 col-sm-3 InfoBanner-aside">
                                <div className="row">
                                    <Fade duration={600} delay={300} triggerOnce>
                                        <div className="col-12 text"><span className="value  InfoBannerID-colaboradores InfoBannerID-colaboradores-plantas" akhi="6">0</span> <span className="InfoBannerID-colaboradores-texto">Plantas Equipadas</span></div>
                                        <div className="col-12 custom-margin"><span className="value    InfoBannerID-colaboradores InfoBannerID-colaboradores-registros" akhi="630">0</span> <span className="InfoBannerID-colaboradores-texto">Registros</span></div>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}

export default InfoBanner
