import './InfoCards.css'
import React from 'react'
import dataLeti from '../../../../data/dataLeti'


function InfoCards() {
    return (
        <section className="container InfoCards__Leti">
            <div className="row justify-content-around">
                {dataLeti.map(el =>
                    <div className="col InfoCards__Leti__cards">
                        <h4>{el.title}</h4>
                        <p>{el.info}</p>
                    </div>)}
            </div>

        </section>
    )
}

export default InfoCards
