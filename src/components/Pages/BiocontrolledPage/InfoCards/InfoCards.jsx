import './InfoCards.css'
import React from 'react'
import dataBiocontrolled from '../../../../data/dataBiocontrolled'


function InfoCards() {
    return (
        <section className="container InfoCards">
            <div className="row justify-content-around">
                {dataBiocontrolled.map(el =>
                    <div className="col-12 col-sm-4 InfoCards__cards">
                        <h4>{el.title}</h4>
                        <p>{el.info}</p>
                    </div>)}
            </div>

        </section>
    )
}

export default InfoCards
