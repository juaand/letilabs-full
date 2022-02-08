import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getBannerTech} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Banner() {

    const [getData, setGetData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerTech([])
            setGetData(getBannerData[0])
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Banner__Tech">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-7 Banner__Tech__title">
                            <Fade delay={1300} direction="left" triggerOnce>
                                <h1>{getData?.title}</h1>
                                <h3 delay={1000} dangerouslySetInnerHTML={{__html: getData?.description}} />
                            </Fade>
                        </div>
                        <Fade cascade delay={1500} triggerOnce>
                            <div className="Banner__Tech__blue parallax" data-speed="-0.08" data-axis="vertical" />
                            <div className="Banner__Tech__bg parallax" data-speed="-.1" data-axis="vertical" style={{
                                background: `url("${getData?.imgURL}") no-repeat center center / cover`
                            }} />
                        </Fade>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner
