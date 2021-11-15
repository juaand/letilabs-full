import './Unidades.css'
import React, {useState, useEffect} from 'react'
import unidadesNegocio from '../../../../data/unidadesNegocio'
import {Link} from 'react-router-dom'

function Unidades() {

    let n = 1

    const [bool, setBool] = useState(true)

    const seoURL = (str) => {
        return str.toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()
            .replace(/&/g, '-and-')
            // eslint-disable-next-line
            .replace(/[^a-z0-9\-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-*/, '')
            .replace(/-*$/, '')
    }

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
            <div className="container-fluid Unidades__logos">
                {unidadesNegocio.map(el =>
                    <>
                        {bool && n % 2 === 0 ?
                            <div className="row Unidades__row justify-content-end">
                                <div className="col-12 col-sm-4 Unidades__desc Unidades__desc__right">
                                    <p>{el.desc}</p>
                                    <Link to="/" className="Unidades__square-btn"></Link>
                                </div>
                                <div className="col-12 col-sm-5 Unidades__logo" style={{
                                    background: `#f5f5f5 url("./images/${el.name.toLowerCase()}.svg") no-repeat center center / contain`
                                }}></div>
                            </div>
                            :
                            <div className="row Unidades__row">
                                <div className="col-12 col-sm-5 Unidades__logo" style={{
                                    background: `#f5f5f5 url("./images/${seoURL(el.name).toLowerCase()}.svg") no-repeat center center / contain`
                                }}></div>
                                <div className="col-12 col-sm-4 Unidades__desc">
                                    <p>{el.desc}</p>
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
