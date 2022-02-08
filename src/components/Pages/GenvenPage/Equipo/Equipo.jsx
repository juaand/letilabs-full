import './Equipo.css'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Fade} from 'react-awesome-reveal'
import {getEquipoGenvenOC} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Equipo() {

    const [bannerData, setBannerData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getEquipoGenvenOC()
            setBannerData(getBannerData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Equipo">
                <div className="row">
                    <Fade triggerOnce>
                        <div className="Equipo__red-stroke parallax-rotate" data-speed="0.1" />
                    </Fade>
                    <Fade triggerOnce>
                        <div className="col-12 col-sm-6 Equipo__clip" style={{
                            background: `url(${bannerData?.imgURL}) repeat left center / cover`,
                        }} />
                    </Fade>
                    <div className="col-11 col-sm-5 offset-sm-6 Equipo__info">
                        <Fade triggerOnce direction="up" delay={200}>
                            <p className="Equipo__desc">{bannerData?.description}</p>

                            <p className="blue-text">{bannerData?.person}</p>
                        </Fade>
                        <Fade triggerOnce direction="up" delay={200}>
                            <Link to={bannerData?.buttonLink} className="leti-btn">{bannerData?.buttonTitle}</Link>
                        </Fade>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Equipo
