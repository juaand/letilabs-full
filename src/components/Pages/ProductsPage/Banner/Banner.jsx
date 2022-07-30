import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {getProductBanner} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Banner() {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getProductBanner()
            setData(getBannerData[0])
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Banner__Products">
                <div className="container">
                    <div className="row Banner__btns__align">
                        <div className="col-12 col-sm-9 Banner__Products__title">
                            <Fade duration={600} direction="left" triggerOnce>
                                <h1 dangerouslySetInnerHTML={{__html: data?.title}} />
                                <h3 dangerouslySetInnerHTML={{__html: data?.description}} />
                            </Fade>
                        </div>
                        <Fade duration={600} direction="down" triggerOnce className="col-12 Banner__Products__btns">
                            <div className="row">
                                <Link to={data?.button1Link} className="col-12 col-sm-3 col-lg-3 leti-btn">{data?.button1Title}</Link>
                            </div>
                        </Fade>
                        <Fade cascade delay={600} triggerOnce>
                            <div className="Banner__Products__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                            <div className="Banner__Products__bg parallax" data-speed="-.1" data-axis="vertical" style={{
                                background: `url("${data?.imgURL}") no-repeat center / contain`
                            }}></div>
                        </Fade>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner
