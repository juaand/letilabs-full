import React, {useState, useEffect} from 'react'
import {getNews} from '../../../services/ApiClient'

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
        <div>
            {newsData.map(el => <h1>{el.title}</h1>)}
        </div>
    )
}

export default NewsPage
