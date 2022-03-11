import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getSeo} from '../../../services/ApiClient'

import InfoCards from './InfoCards/InfoCards'
import BottomCta from './BottomCta/BottomCta'
import Director from './Director/Director'
import Careers from './Careers/Careers'
import Banner from './Banner/Banner'

import './OurPeoplePage.css'

function OurPeoplePage() {

    const [seoInfo, setSeoInfo] = useState('')

    useEffect(() => {

        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        const fetchData = async () => {
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Nuestra gente')
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
            <main className="OurPeoplePage">
                <Banner />
                <InfoCards />
                <Careers />
                <Director />
                <BottomCta />
            </main>
        </>
    )
}

export default OurPeoplePage
