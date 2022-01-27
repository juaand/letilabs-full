import './InfoCards.css'
import React from 'react'
import dataOurPeople from '../../../../data/dataOurPeople'
import {Fade} from 'react-awesome-reveal'


function InfoCards() {
    return (
        <section className="container-fluid InfoCards__OurPeople">
            <Fade triggerOnce>
                <h1>Somos tres equipos trabajando en constante sinergia</h1>
            </Fade>
            <div className="container-fluid InfoCards">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row justify-content-around">
                            <Fade className="col InfoCards__OurPeople__cards" cascade delay={300} direction="up" triggerOnce>
                                {dataOurPeople.map(el =>
                                    <>
                                        <h4>{el.title}</h4>
                                        <p>{el.info}</p>
                                    </>)}
                            </Fade>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoCards
