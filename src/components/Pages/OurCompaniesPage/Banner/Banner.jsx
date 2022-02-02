import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {getBannerOC} from '../../../../services/ApiClient'

function Banner() {

    const [bannerData, setBannerData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerOC()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid Banner__ourCompanies">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-12 col-sm-6 Banner__ourCompanies__title">
                        <Fade direction="left" duration={600} triggerOnce>
                            <h1 dangerouslySetInnerHTML={{__html: bannerData?.description}} />
                        </Fade>
                    </div>
                    <div className="col-12 col-sm-6 Banner__ourCompanies__bg">
                        <Fade delay={1000} duration={600} triggerOnce>
                            <img src={bannerData?.imgURL} alt="Sobre nosotros banner" />
                        </Fade>
                    </div>
                </div>
            </div>
            <Fade cascade delay={600} triggerOnce>
                <div className="leti-blue-triangle parallax" data-speed="-.2" data-axis="vertical"></div>
                <div className="leti-red-triangle parallax" data-speed=".03" data-axis="vertical"></div>
            </Fade>
        </section>
    )
}

export default Banner
