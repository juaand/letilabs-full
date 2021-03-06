import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"

import './Banner.css'
import {getBanner} from '../../../../services/ApiClient'

function Banner() {

    const [bannerData, setBannerData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBanner()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid Banner">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-12 col-sm-6 Banner__title">
                        <Fade direction="left" duration={600} triggerOnce>
                            <h1 dangerouslySetInnerHTML={{__html: bannerData?.description}} />
                        </Fade>
                    </div>
                    <div className="col-12 col-sm-6 Banner__bg">
                        <Fade delay={300} duration={600} triggerOnce>
                            <img src={bannerData?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="Somos Leti banner" />
                        </Fade>
                    </div>
                </div>
            </div>
            <Fade cascade delay={600} triggerOnce>
                <div className="leti-blue-triangle parallax" data-speed="-.2" data-axis="vertical"></div>
                <div className="leti-red-triangle parallax" data-speed=".05" data-axis="vertical"></div>
            </Fade>
        </section>
    )
}

export default Banner
