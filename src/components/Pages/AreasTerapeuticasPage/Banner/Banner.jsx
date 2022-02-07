import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getBannerTA} from '../../../../services/ApiClient'


function Banner() {

    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerTA()
            setData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid Banner__AreasTerapeuticas">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__AreasTerapeuticas__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1 dangerouslySetInnerHTML={{__html: data?.title}} />
                            <h3 dangerouslySetInnerHTML={{__html: data?.description}} />
                        </Fade>
                    </div>
                    <Fade cascade delay={1500} triggerOnce>
                        <div className="Banner__AreasTerapeuticas__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__AreasTerapeuticas__bg parallax" data-speed="-.1" data-axis="vertical" style={{
                            background: `url("${data?.imgURL}") no-repeat center center / contain`
                        }}></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
