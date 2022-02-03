import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getBannerID} from '../../../../services/ApiClient'

function Banner() {

    const [getData, setGetData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerID()
            setGetData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid Banner__IYD">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__IYD__title">
                        <Fade delay={1300} direction="left" triggerOnce>
                            <h1>{getData?.title}</h1>
                            <h3 delay={1000} dangerouslySetInnerHTML={{__html: getData?.description}} />
                        </Fade>
                    </div>
                    <Fade cascade delay={300} triggerOnce>
                        <div className="Banner__IYD__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__IYD__bg parallax" data-speed="-.1" data-axis="vertical" style={{
                            background: `url("${getData?.imgURL}") no-repeat center center / cover`
                        }}></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
