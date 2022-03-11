import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getSeo} from '../../../services/ApiClient'

import AllianceForm from './AllianceForm/AllianceForm'
import BottomCta from './BottomCta/BottomCta'
import Carousel from './Carousel/Carousel'
import Banner from './Banner/Banner'

import './AlliancesPage.css'

function AlliancesPage() {

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
            const filterSeo = getSeoData.filter(seo => seo.page === 'Alianzas')
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
                <Carousel />
                <AllianceForm />
                <BottomCta />
            </main>
        </>
    )
}

export default AlliancesPage
