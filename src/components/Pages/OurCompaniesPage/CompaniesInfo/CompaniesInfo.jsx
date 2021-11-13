import './CompaniesInfo.css'
import React from 'react'
import unidadesNegocio from '../../../../data/unidadesNegocio'
import {Link} from 'react-router-dom'


function CompaniesInfo() {
    return (
        <section className="container-fluid CompaniesInfo ">
            <div className="CompaniesInfo__absolute d-none d-sm-block">
                <div className="row justify-content-around">
                    {unidadesNegocio.map(el =>
                        <Link to={`/${el.name.toLowerCase()}`} className="col-12 col-sm-3 CompaniesInfo__card">
                            <div className="CompaniesInfo__card-img">
                                <img src={`./images/${el.name.toLowerCase()}.svg`} className="CompaniesInfo__card-logo" alt={"conoce más sobre" + el.name} />
                            </div>
                            <div className="CompaniesInfo__card-body">
                                <p className="CompaniesInfo__card-text" dangerouslySetInnerHTML={{__html: el.info}}>
                                </p>
                            </div>
                            <div className="CompaniesInfo__card-footer">
                                <div className="CompaniesInfo__card-link"></div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <div className="CompaniesInfo__absolute d-block d-sm-none">
                ESTO SOLO SE MUESTRA EN MÓVILES
            </div>
        </section>
    )
}

export default CompaniesInfo
