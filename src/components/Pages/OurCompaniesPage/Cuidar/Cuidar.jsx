import './Cuidar.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {getCareOC} from '../../../../services/ApiClient'

function Cuidar() {

    const [bannerData, setBannerData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getCareOC()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid Cuidar">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 Cuidar__clip">
                        <div className="Cuidar__stroke parallax" data-speed="-0.04" data-axis="horizontal" />
                        <div className="Cuidar__clip-content parallax" data-speed="0.06" data-axis="vertical" style={{
                            background: `url(${bannerData?.imgURL}) no-repeat center center / cover`
                        }} />
                    </div>
                    <div className="col-12 col-sm-5">
                        <Fade direction="down" triggerOnce>
                            <h1 className="text-center">{bannerData?.description}</h1>
                        </Fade>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Cuidar
