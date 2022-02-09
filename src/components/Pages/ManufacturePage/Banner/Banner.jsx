import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getBannerManufacture} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Banner() {

    const [banner, setBanner] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerManufacture()
            setBanner(getBannerData[0])
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Banner__Manufacture">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-7 Banner__Manufacture__title">
                            <Fade cascade duration={600} direction="left" triggerOnce>
                                <h1>{banner?.title}</h1>
                                <h3 dangerouslySetInnerHTML={{__html: banner?.description}} />
                            </Fade>
                        </div>
                        <Fade cascade delay={600} triggerOnce>
                            <div className="Banner__Manufacture__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                            <div className="Banner__Manufacture__bg parallax" data-speed="-.1" data-axis="vertical" style={{
                                background: `url("${banner?.imgURL}") no-repeat center center / cover`
                            }}></div>
                        </Fade>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner
