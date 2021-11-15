import './CompaniesInfo.css'
import React from 'react'
import unidadesNegocio from '../../../../data/unidadesNegocio'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'


function CompaniesInfo() {
    let settings = {
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    className: "center",
                    centerMode: true,
                    infinite: true,
                    centerPadding: "0px",
                    speed: 500,
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

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


    return (
        <>
            <section className="container-fluid CompaniesInfo d-none d-sm-block">
                <div className="CompaniesInfo__absolute">
                    <div className="row justify-content-around">
                        {unidadesNegocio.map(el =>
                            <Link to={`/${seoURL(el.name).toLowerCase()}`} className="col-sm-3 CompaniesInfo__card">
                                <div className="CompaniesInfo__card-img">
                                    <img src={`./images/${seoURL(el.name).toLowerCase()}.svg`} className="CompaniesInfo__card-logo" alt={"conoce más sobre " + el.name} />
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
            </section>
            {/* Responsive */}
            <section className="container-fluid CompaniesInfoResp d-block d-sm-none">
                <div className="row justify-content-center">
                    <Slider {...settings}>
                        {unidadesNegocio.map(el =>
                            <div className="CompaniesInfoResp__card">
                                <div className="CompaniesInfoResp__card-img">
                                    <img src={`./images/${seoURL(el.name).toLowerCase()}.svg`} className={`CompaniesInfoResp__card-${seoURL(el.name).toLowerCase()}`} alt={"conoce más sobre " + el.name} />
                                </div>
                                <div className="CompaniesInfoResp__card-body">
                                    <p className="CompaniesInfoResp__card-text" dangerouslySetInnerHTML={{__html: el.info}}>
                                    </p>
                                </div>
                                <div className="CompaniesInfoResp__card-footer">
                                    <Link to={`/${seoURL(el.name).toLowerCase()}`} className="CompaniesInfoResp__card-link"></Link>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default CompaniesInfo
