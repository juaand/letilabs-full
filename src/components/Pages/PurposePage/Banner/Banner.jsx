import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {getBannerPurpose} from '../../../../services/ApiClient'

function Banner() {

    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerPurpose()
            setData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid Banner__Purpose">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-12 col-sm-6 Banner__Purpose__title">
                        <Fade direction="left" duration={600} triggerOnce>
                            <h1 dangerouslySetInnerHTML={{__html: data?.description}} />
                        </Fade>
                    </div>
                    <div className="col-12 col-sm-6 Banner__Purpose__bg">
                        <Fade delay={1000} duration={600} triggerOnce>
                            <img src={data?.imgURL} alt="Propósito y responsabilidad social banner" />
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
