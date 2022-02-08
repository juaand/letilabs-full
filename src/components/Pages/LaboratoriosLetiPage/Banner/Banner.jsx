import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getBannerOCLeti} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Banner() {

    const [bannerData, setBannerData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerOCLeti()
            setBannerData(getBannerData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Banner__Leti">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-7 Banner__Leti__title">
                            <Fade triggerOnce delay={1000}>
                                <img className="Banner__Leti-logo" src={bannerData?.logoURL} alt="Leti" />
                            </Fade>
                            <Fade delay={1300} direction="left" triggerOnce>
                                <h3 dangerouslySetInnerHTML={{__html: bannerData?.description}} />
                            </Fade>
                        </div>
                        <Fade cascade delay={1500} triggerOnce>
                            <div className="Banner__Leti__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                            <div className="Banner__Leti__bg parallax" data-speed="-.1" data-axis="vertical" style={{
                                background: `url(${bannerData?.imgURL}) no-repeat center / contain`,
                            }}></div>
                        </Fade>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner
