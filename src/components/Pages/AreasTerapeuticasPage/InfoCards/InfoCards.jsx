import './InfoCards.css'
import React from 'react'
import dataBiocontrolled from '../../../../data/dataBiocontrolled'
import {Fade} from 'react-awesome-reveal'


function InfoCards() {
    return (
        <section className="container InfoCards">
            <div className="row justify-content-around">
                <Fade className="col InfoCards__Leti__cards" cascade delay={300} direction="up" triggerOnce>
                    {dataBiocontrolled.map(el =>
                        <>
                            <h4>{el.title}</h4>
                            <p>{el.info}</p>
                        </>)}
                </Fade>
            </div>

        </section>
    )
}

export default InfoCards