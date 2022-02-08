import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getBannerOCGenven} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Banner() {

    const [bannerData, setBannerData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerOCGenven()
            setBannerData(getBannerData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Banner__Genven">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-7 Banner__Genven__title">
                            <Fade delay={1000} triggerOnce>
                                <img className="Banner__Genven-logo" src={bannerData?.logoURL} alt="Genven" />
                            </Fade>
                            <Fade delay={1300} direction="left" triggerOnce>
                                <h3 dangerouslySetInnerHTML={{__html: bannerData?.description}} />
                            </Fade>
                        </div>
                        <Fade cascade delay={1500} triggerOnce>
                            <div className="Banner__Genven__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                            <div className="Banner__Genven__bg parallax" data-speed="-.1" data-axis="vertical" style={{
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
