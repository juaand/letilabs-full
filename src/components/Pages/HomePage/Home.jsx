import React, {useState, useEffect} from 'react'
import CookieConsent from "react-cookie-consent"
import {Helmet} from 'react-helmet'

import {createContent, getCookieInfo, getSeo} from '../../../services/ApiClient'
import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'
import {useAuthContext} from '../../../contexts/AuthContext'

import FindProduct from './FindProduct/FindProduct'
import Portafolio from './Portafolio/Portafolio'
import Carousel from './Carousel/Carousel'
import Unidades from './Unidades/Unidades'
import UsInfo from './UsInfo/UsInfo'
import Video from './Video/Video'

import './Home.css'

function Home() {

    const [cookieInfo, setCookieInfo] = useState('')
    const [seoInfo, setSeoInfo] = useState('')

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/',
        name: 'Inicio'
    }

    useEffect(() => {
        if (user) {
            const mainContent = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
            mainContent.forEach(content => {
                data.content.push(content.innerText)
            })

            const fetchData = async () => {
                await createContent(data)
            }
            fetchData()
        }

        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        const fetchData = async () => {
            const getCookieInfoData = await getCookieInfo()
            const getSeoData = await getSeo()
            setCookieInfo(getCookieInfoData.info)
            const filterSeo = getSeoData.filter(seo => seo.page === 'Inicio')
            setSeoInfo(filterSeo[0])
        }
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <title>{`Grupo Leti | ${seoInfo?.page}`}</title>
                <meta name="description" content={`${seoInfo?.description}`} />
                <meta name="keywords" content={`${seoInfo?.keywords}`} />
            </Helmet>
            <main>
                <Video />
                <UsInfo />
                <Carousel />
                <Unidades />
                <Portafolio />
                <FindProduct />
                <FarmacoVigilancia />
            </main>
            <CookieConsent
                location="bottom"
                buttonText="Aceptar"
                cookieName="cookieConsentimiento"
                style={{fontSize: "14px", color: "#fff"}}
                expires={150}
            >
                <div className="container Cookies__container">
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <h1>Política de cookies</h1>
                        </div>
                        <div className="col-12 col-sm-6">
                            <p dangerouslySetInnerHTML={{__html: cookieInfo}} />
                        </div>
                    </div>
                </div>
            </CookieConsent>
        </>
    )
}

export default Home
