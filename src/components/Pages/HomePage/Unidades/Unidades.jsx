import './Unidades.css'
import React, {useState, useEffect} from 'react'
import unidadesNegocio from '../../../../data/unidadesNegocio'
import {Link} from 'react-router-dom'

function Unidades() {

    let n = 1

    const [bool, setBool] = useState(true)

    useEffect(() => {
        if (window.screen.width <= 576) {
            setBool(false)
        }
    }, [])

    return (
        <section className="Unidades">
            <div className="big-gray-triangle"></div>
            <div className="small-gray-triangle"></div>
            <div className="container">
                <h1>Nos conformamos <br />de 3 unidades<br /> de negocio</h1>
            </div>
            <div className="container-fluid">
                {unidadesNegocio.map(el =>
                    <>
                        {bool && n % 2 === 0 ?
                            <div className="row Unidades__row justify-content-end">
                                <div className="col-12 col-sm-4 Unidades__desc Unidades__desc__right">
                                    {el.desc}
                                    <Link to="/" className="Unidades__square-btn"></Link>
                                </div>
                                <div className="col-12 col-sm-4 Unidades__logo" style={{
                                    background: `#f5f5f5 url("./images/${el.name.toLowerCase()}.svg") no-repeat center center / contain`
                                }}></div>
                            </div>
                            :
                            <div className="row Unidades__row">
                                <div className="col-12 col-sm-6 Unidades__logo" style={{
                                    background: `#f5f5f5 url("./images/${el.name.toLowerCase()}.svg") no-repeat center center / contain`
                                }}></div>
                                <div className="col-12 col-sm-4 Unidades__desc">
                                    {el.desc}
                                    <Link to="/" className="Unidades__square-btn"></Link>
                                </div>
                            </div>
                        }
                        <div className="d-none">{n++}</div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Unidades
