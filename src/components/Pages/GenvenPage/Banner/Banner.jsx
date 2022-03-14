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
                            <Fade duration={600} triggerOnce>
                                <img className="Banner__Genven-logo" src={bannerData?.logoURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="Genven" />
                            </Fade>
                            <Fade duration={600} direction="left" triggerOnce>
                                <h3 dangerouslySetInnerHTML={{__html: bannerData?.description}} />
                            </Fade>
                        </div>
                        <Fade cascade delay={600} triggerOnce>
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
