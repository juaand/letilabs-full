import './NewsPage.css'
import React, {useState, useEffect} from 'react'
import {getNews} from '../../../services/ApiClient'
import Banner from './Banner/Banner'
import Lastest from './Lastest/Lastest'
import Most from './Most/Most'

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
        <main>
            <Banner newsData={newsData?.filter(el => el?.outstanding === true)} />
            <Lastest newsData={newsData?.filter(el => el?.outstanding !== true).slice(0, 3)} />
            <Most newsData={newsData} />
        </main>
    )
}

export default NewsPage
