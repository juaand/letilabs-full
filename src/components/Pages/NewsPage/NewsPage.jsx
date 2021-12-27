import './NewsPage.css'
import React, {useState, useEffect} from 'react'
import {getNews} from '../../../services/ApiClient'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import Lastest from './Lastest/Lastest'
import Most from './Most/Most'
import FindNews from './FindNews/FindNews'

function NewsPage() {

    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getNewsData = await getNews()
            setNewsData(getNewsData)
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
                <Lastest newsData={newsData?.filter(el => el?.outstanding !== true).slice(0, 3)} />
                <Most newsData={newsData} />
                <FindNews />
            </main>
        </>
    )
}

export default NewsPage
