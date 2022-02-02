import './BannerProductos.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {getBannerProductsOC} from '../../../../services/ApiClient'

function BannerProductos() {

    const [bannerData, setBannerData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerProductsOC()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid BannerProductos">
            <img data-speed="-.2" data-axis="horizontal" src="./images/ulgarin.png" className="parallax BannerProductos__img-ulgarin" alt="grupo leti ulgarin" />
            <img data-speed=".08" data-axis="horizontal" src="./images/azitomicina.png" className="parallax BannerProductos__img-azitomicina" alt="grupo leti azitomicina" />
            <img data-speed="-.06" data-axis="horizontal" src="./images/diklason_box.png" className="parallax BannerProductos__img-diklason" alt="grupo leti diklason" />
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-12 col-sm-8">
                        <Fade direction="down" duration={600} triggerOnce>
                            <h1 className="BannerProductos__title">{bannerData?.description}</h1>
                        </Fade>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6">
                        <Fade direction="down" duration={600} triggerOnce>
                            <h1 className="BannerProductos__subtitle">{bannerData?.description2}</h1>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerProductos
