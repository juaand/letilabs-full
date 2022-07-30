import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getSeo} from '../../../services/ApiClient'

import CompaniesInfo from './CompaniesInfo/CompaniesInfo'
import BannerProductos from './BannerProductos/BannerProductos'
import BottomCta from './BottomCta/BottomCta'
import Innovar from './Innovar/Innovar'
import Banner from './Banner/Banner'
import Cuidar from './Cuidar/Cuidar'

import './OurCompanies.css'

function OurCompanies() {

    const [seoInfo, setSeoInfo] = useState('')


    useEffect(() => {

        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        const fetchData = async () => {
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Nuestras empresas')
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
                <CompaniesInfo />
                <BannerProductos />
                <Innovar />
                <Cuidar />
                <BottomCta />
            </main>
        </>
    )
}

export default OurCompanies
