import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getProductListBanner} from '../../../../services/ApiClient'


function Banner() {

    const [banner, setBanner] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductListBanner()
            setBanner(data[0])
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid Banner__ProductsList">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 Banner__ProductsList__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1 dangerouslySetInnerHTML={{__html: banner?.title}} />
                            <h3 dangerouslySetInnerHTML={{__html: banner?.description}} />
                        </Fade>
                    </div>
                    <Fade cascade delay={1500} triggerOnce>
                        <div className="Banner__ProductsList__blue parallax" data-speed="-0.08" data-axis="vertical" />
                        <div className="Banner__ProductsList__bg parallax" data-speed="-.1" data-axis="vertical" style={{
                            background: `url("${banner?.imgURL}") no-repeat center / contain`
                        }} />
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
