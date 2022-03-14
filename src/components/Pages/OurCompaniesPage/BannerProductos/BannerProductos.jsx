import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"

import {getBannerProductsOC} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'
import './BannerProductos.css'

function BannerProductos() {

    const [bannerData, setBannerData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerProductsOC()
            setBannerData(getBannerData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid BannerProductos">
                <img data-speed="-.2" data-axis="horizontal" src={bannerData?.imgURL} className="parallax BannerProductos__img-ulgarin" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="grupo leti ulgarin" />
                <img data-speed=".08" data-axis="horizontal" src={bannerData?.img2URL} className="parallax BannerProductos__img-azitomicina" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="grupo leti azitomicina" />
                <img data-speed="-.06" data-axis="horizontal" src={bannerData?.img3URL} className="parallax BannerProductos__img-diklason" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="grupo leti diklason" />
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-12 col-sm-8">
                            <Fade direction="down" duration={600} triggerOnce>
                                <h1 dangerouslySetInnerHTML={{__html: bannerData?.description}} className="BannerProductos__title" />
                            </Fade>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-6">
                            <Fade direction="down" duration={600} triggerOnce>
                                <h1 dangerouslySetInnerHTML={{__html: bannerData?.description2}} className="BannerProductos__subtitle" />
                            </Fade>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BannerProductos
