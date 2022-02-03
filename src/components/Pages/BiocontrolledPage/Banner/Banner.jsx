import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getBannerOCBiocontrolled} from '../../../../services/ApiClient'

function Banner() {

    const [bannerData, setBannerData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerOCBiocontrolled()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid Banner__Biocontrolled">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Biocontrolled__title">
                        <Fade delay={1000} triggerOnce>
                            <img className="Banner__Biocontrolled-logo" src={bannerData?.logoURL} alt="Biocontrolled logo" />
                        </Fade>
                        <Fade delay={1300} direction="left" triggerOnce>
                            <h3 dangerouslySetInnerHTML={{__html: bannerData?.description}} />
                        </Fade>
                    </div>
                    <Fade cascade delay={1500} triggerOnce>
                        <div className="Banner__Biocontrolled__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__Biocontrolled__bg parallax" data-speed="-.1" data-axis="vertical" style={{
                            background: `url(${bannerData?.imgURL}) no-repeat center / contain`,
                        }}></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
