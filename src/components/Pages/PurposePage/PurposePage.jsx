import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getSeo} from '../../../services/ApiClient'

import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'
import Timeline from './Timeline/Timeline'
import Banner from './Banner/Banner'
import Video from './Video/Video'

import './PurposePage.css'

function PurposePage() {

    const [seoInfo, setSeoInfo] = useState('')

    useEffect(() => {

        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        const fetchData = async () => {
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Propósito y responsabilidad social')
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
                <Banner />
                <Video />
                <Timeline />
                <FarmacoVigilancia />
            </main>
        </>
    )
}

export default PurposePage
