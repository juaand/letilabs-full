import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {getBannerOurPeople} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Banner() {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerOurPeople()
            setData(getBannerData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Banner__OurPeople">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-12 col-sm-6 Banner__OurPeople__title">
                            <Fade direction="left" duration={600} triggerOnce>
                                <h1 dangerouslySetInnerHTML={{__html: data?.title}} />
                                <p dangerouslySetInnerHTML={{__html: data?.description}} />
                            </Fade>
                        </div>
                        <div className="col-12 col-sm-6 Banner__OurPeople__bg">
                            <Fade delay={1000} duration={600} triggerOnce>
                                <img src={data?.imgURL} onerror="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt="Grupo Leti Nuestra gente" />
                            </Fade>
                        </div>
                    </div>
                </div>
                <Fade cascade delay={600} triggerOnce>
                    <div className="leti-blue-triangle parallax" data-speed="-.2" data-axis="vertical"></div>
                    <div className="leti-red-triangle parallax" data-speed=".03" data-axis="vertical"></div>
                </Fade>
            </section>
        </>
    )
}

export default Banner
