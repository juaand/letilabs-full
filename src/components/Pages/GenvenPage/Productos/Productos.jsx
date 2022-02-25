import React, {useState, useEffect} from 'react'
import {Fade, Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import {Link} from 'react-router-dom'

import {getProductosGenvenOC} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'
import './Productos.css'

function Productos() {

    const [bannerData, setBannerData] = useState()
    const [loading, setLoading] = useState(true)

    const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, 10rem, 0);
    }
  
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }`

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getProductosGenvenOC()
            setBannerData(getBannerData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container Productos">
                <div className="Productos__genven-001 parallax" data-axis="horizontal" data-speed="0.2" style={{
                    background: `url(${bannerData?.img1URL}) no-repeat right center /contain`,
                }} />
                <div className="Productos__genven-002 parallax" data-axis="horizontal" data-speed="0.17" style={{
                    background: `url(${bannerData?.img2URL}) no-repeat center / contain`
                }} />
                <div className="Productos__genven-003 parallax" data-axis="horizontal" data-speed="0.1" style={{
                    background: `url(${bannerData?.img3URL}) no-repeat center / contain`
                }} />
                <div className="row">
                    <div className="col-9 col-sm-5 offset-sm-1 Productos__info">
                        <Fade direction="up" triggerOnce>
                            <h1 dangerouslySetInnerHTML={{__html: bannerData?.description}} className="Productos__desc" />
                        </Fade>
                        <Reveal delay={200} keyframes={customAnimation} triggerOnce>
                            <Link to={bannerData?.buttonLink} className="leti-btn">{bannerData?.buttonTitle}</Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Productos
