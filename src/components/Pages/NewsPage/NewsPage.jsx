import './NewsPage.css'
import React, {useState, useEffect} from 'react'
import {getNews, getNewsTitles} from '../../../services/ApiClient'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import Lastest from './Lastest/Lastest'
import Most from './Most/Most'
import FindNews from './FindNews/FindNews'
import LetiNews from './LetiNews/LetiNews'

function NewsPage() {

    const [newsData, setNewsData] = useState([])
    const [titlesData, setTitlesData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getNewsData = await getNews()
            const getTitlesData = await getNewsTitles()
            setNewsData(getNewsData)
            setTitlesData(getTitlesData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <title>Grupo Leti | Noticias</title>
                <meta name="description" content="Para nosotros siempre ha sido prioridad contar con la tecnología e infraestructura que nos permita desarrollar los mejores productos, y además en las cantidades necesarias para cuidar de la salud de todo el país." />
                <meta name="keywords" content="Grupo Leti, Noticias" />
            </Helmet>
            <main>
                <Banner newsData={newsData?.filter(el => el?.outstanding === true)} />
                <LetiNews title={titlesData} newsData={newsData}/>
                <Lastest title={titlesData} newsData={newsData?.filter(el => el?.outstanding !== true).slice(0, 3)} />
                <Most title={titlesData} newsData={newsData} />
                <FindNews title={titlesData} />
            </main>
        </>
    )
}

export default NewsPage
