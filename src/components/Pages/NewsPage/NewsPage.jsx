import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getNews, getNewsTitles, getSeo} from '../../../services/ApiClient'

import FindNews from './FindNews/FindNews'
import LetiNews from './LetiNews/LetiNews'
import Loader from '../../Loader/Loader'
import Lastest from './Lastest/Lastest'
import Banner from './Banner/Banner'
import Most from './Most/Most'

import './NewsPage.css'

function NewsPage() {

    const [titlesData, setTitlesData] = useState([])
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [seoInfo, setSeoInfo] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const getNewsData = await getNews()
            const getTitlesData = await getNewsTitles()
            setNewsData(getNewsData)
            setTitlesData(getTitlesData)
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Noticias')
            setSeoInfo(filterSeo[0])
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Helmet>
                <title>{`Grupo Leti | ${seoInfo?.page}`}</title>
                <meta name="description" content={`${seoInfo?.description}`} />
                <meta name="keywords" content={`${seoInfo?.keywords}`} />
            </Helmet>
            <main>
                <Banner newsData={newsData?.filter(el => el?.outstanding === true)} />
                <LetiNews title={titlesData} newsData={newsData} />
                <Lastest title={titlesData} newsData={newsData?.filter(el => el?.outstanding !== true).slice(0, 3)} />
                <Most title={titlesData} newsData={newsData} />
                <FindNews title={titlesData} />
            </main>
        </>
    )
}

export default NewsPage
