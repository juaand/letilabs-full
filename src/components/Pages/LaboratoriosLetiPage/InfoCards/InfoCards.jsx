import './InfoCards.css'
import React from 'react'
import dataLeti from '../../../../data/dataLeti'
import {Fade} from 'react-awesome-reveal'


function InfoCards() {
    return (
        <section className="container InfoCards__Leti">
            <div className="row justify-content-around">
                <Fade className="col InfoCards__Leti__cards" cascade delay={300} direction="up" triggerOnce>
                    {dataLeti.map(el =>
                        <>
                            <h4>{el.title}</h4>
                            <p>{el.info}</p>
                        </>
                    )}
                </Fade>
            </div>

        </section>
    )
}

export default InfoCards
