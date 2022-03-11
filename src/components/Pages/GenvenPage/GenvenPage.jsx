import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getSeo} from '../../../services/ApiClient'

import Productos from './Productos/Productos'
import Timeline from './Timeline/Timeline'
import Equipo from './Equipo/Equipo'
import Banner from './Banner/Banner'
import Video from './Video/Video'

import './GenvenPage.css'

function GenvenPage() {

    const [seoInfo, setSeoInfo] = useState('')

    useEffect(() => {
        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        const isCloseSearch = document.querySelector('.Header__search-close')
        if (isCloseSearch) {
            isCloseSearch.classList.remove('Header__search-close')
        }

        const fetchData = async () => {
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Genven')
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
                <Productos />
                <Timeline />
                <Equipo />
            </main>
        </>
    )
}

export default GenvenPage
