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
        <section className="container-fluid InfoBanner">
        <div className="InfoBanner-data col-12">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-8">
                        <div className="row d-flex justify-content-between">
                            <div className="co-12 col-sm-5">
                            <div className="row">
                                <Fade cascade duration={600} delay={300} triggerOnce>
                                    <div className="col-12 InfoBanner-colaboradores" data-speed="-.1" data-axis="vertical">+<span className="value" akhi="850">0</span> <span className="InfoBanner-colaboradores-texto">Colaboradores</span></div>
                                    <div className="col-12 text-desc" data-speed=".05" data-axis="vertical">En LETI somos<br/> profesionales de trayectoria</div>
                                </Fade>
                                </div>
                            </div>
                            <div className="col-12 col-sm-5 aside">
                                <div className="row">
                                    <Fade duration={600} delay={300} triggerOnce>
                                        <div className="col-12 text"><span className="value  InfoBanner-colaboradores InfoBanner-colaboradores-mujeres" akhi="55">0</span>% <span className="InfoBanner-colaboradores-texto">mujeres</span></div>
                                        <div className="col-12 custom-margin"><span className="value    InfoBanner-colaboradores InfoBanner-colaboradores-hombres" akhi="45">0</span>% <span className="InfoBanner-colaboradores-texto">hombres</span></div>
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
