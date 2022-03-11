import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getSeo} from '../../../services/ApiClient'

import InfoCards from './InfoCards/InfoCards'
import Timeline from './Timeline/Timeline'
import Banner from './Banner/Banner'
import Equipo from './Equipo/Equipo'

import './LaboratoriosLetiPage.css'

function LaboratoriosLetiPage() {

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
            const filterSeo = getSeoData.filter(seo => seo.page === 'Leti')
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
                <InfoCards />
                <Timeline />
                <Equipo />
            </main>
        </>
    )
}

export default LaboratoriosLetiPage
