import './CompaniesInfo.css'
import React, {useState, useEffect} from 'react'
import {getOurCompaniesOC} from '../../../../services/ApiClient'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import {seoURL} from '../../../../hooks/seoURL'
import Loader from '../../../Loader/Loader'

function CompaniesInfo() {

    const [unidadesNegocio, setUnidadesNegocio] = useState([])
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        const fetchData = async () => {
            const getOurCompaniesOCData = await getOurCompaniesOC()
            setUnidadesNegocio(getOurCompaniesOCData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid CompaniesInfo d-none d-sm-block">
                <div className="CompaniesInfo__absolute">
                    <div className="row justify-content-around">
                        {unidadesNegocio.map(el =>
                            <Link to={`/${seoURL(el?.name).toLowerCase()}`} className="col-sm-3 CompaniesInfo__card">
                                <div className="CompaniesInfo__card-img">
                                    <img src={`./images/${seoURL(el?.name).toLowerCase()}.svg`} className="CompaniesInfo__card-logo" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={"conoce más sobre " + el?.name} />
                                </div>
                                <div className="CompaniesInfo__card-body">
                                    <p className="CompaniesInfo__card-text" dangerouslySetInnerHTML={{__html: el?.info}}>
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
                                    <img src={`./images/${seoURL(el?.name).toLowerCase()}.svg`} className={`CompaniesInfoResp__card-${seoURL(el?.name).toLowerCase()}`} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={"conoce más sobre " + el?.name} />
                                </div>
                                <div className="CompaniesInfoResp__card-body">
                                    <p className="CompaniesInfoResp__card-text" dangerouslySetInnerHTML={{__html: el?.info}}>
                                    </p>
                                </div>
                                <div className="CompaniesInfoResp__card-footer">
                                    <Link to={`/${seoURL(el?.name).toLowerCase()}`} className="CompaniesInfoResp__card-link"></Link>
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
