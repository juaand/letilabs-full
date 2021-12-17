import './InfoCards.css'
import React from 'react'
import dataIyd from '../../../../data/dataIyd'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'


function InfoCards() {
    return (
        <>
            <section className="container InfoCards">
                <div className="row justify-content-around">
                    <Fade className="col InfoCards__Leti__cards" cascade delay={300} direction="up" triggerOnce>
                        {dataIyd.map(el =>
                            <>
                                <h4>{el.title}</h4>
                                <p>{el.info}</p>
                                <Link to={el.btn} className="leti-btn InfoGoals__btn" />
                            </>
                        )}
                    </Fade>
                </div>
            </section>
        </>
    )
}

export default InfoCards
