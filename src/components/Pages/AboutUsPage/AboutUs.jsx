import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getSeo} from '../../../services/ApiClient'

import MarcandoPauta from './MarcandoPauta/MarcandoPauta'
import Timeline from './Timeline/Timeline'
import Gallery from './Gallery/Gallery'
import Science from './Science/Science'
import Banner from './Banner/Banner'
import Megat from './Megat/Megat'

import './AboutUs.css'

function AboutUs() {

    const [seoInfo, setSeoInfo] = useState('')


    useEffect(() => {
        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        const fetchData = async () => {
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Inicio')
            setSeoInfo(filterSeo[0])
        }
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <title>{`Grupo LETI | ${seoInfo?.page}`}</title>
                <meta name="description" content={`${seoInfo?.description}`} />
                <meta name="keywords" content={`${seoInfo?.keywords}`} />
            </Helmet>
            <main>
                <Banner />
                <MarcandoPauta />
                <Timeline />
                <Gallery />
                <Science />
                <Megat />
            </main>
        </>
    )
}

export default AboutUs
