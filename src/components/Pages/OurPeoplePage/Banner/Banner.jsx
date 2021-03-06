import './Banner.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {getBannerOurPeople, createContent} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'
import {useAuthContext} from '../../../../contexts/AuthContext'

function Banner() {
    const {user} = useAuthContext()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)


    const contentData = {
        content: [],
        url: '/gente-leti',
        name: 'Gente LETI'
    }

    useEffect(() => {

        const fetchData = async () => {
            const getBannerData = await getBannerOurPeople()
            setData(getBannerData)
            if (user) {
                const mainContent = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
                mainContent.forEach(content => {
                    contentData.content.push(content.innerText)
                })

                const fetchData = async () => {
                    await createContent(contentData)
                }
                fetchData()
            }
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
                                <img src={data?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="Grupo LETI gente LETI" />
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
