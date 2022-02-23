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
                            <Fade triggerOnce duration={600}>
                                <img className="Banner__Leti-logo" src={bannerData?.logoURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt="Leti" />
                            </Fade>
                            <Fade duration={600} direction="left" triggerOnce>
                                <h3 dangerouslySetInnerHTML={{__html: bannerData?.description}} />
                            </Fade>
                        </div>
                        <Fade cascade delay={600} triggerOnce>
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
