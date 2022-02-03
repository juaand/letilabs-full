import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__OurPhilosophy">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__OurPhilosophy__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1>Filosofía Leti</h1>
                            <h3>
                                Todos los líderes de cada unidad y demás áreas de trabajo, trabajan en conjunto para promover la relación de sinergia entre todas las empresas y así lograr los mejores resultados.
                                <br /><br />
                                Contamos con un talento humano excepcional y altamente calificado que trabaja día a día generando soluciones para los venezolanos, bajo los principios y ética del grupo.
                            </h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={1500} triggerOnce>
                        <div className="Banner__OurPhilosophy__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__OurPhilosophy__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
