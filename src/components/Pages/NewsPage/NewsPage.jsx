import './NewsPage.css'
import React, {useState, useEffect} from 'react'
import {drawTime} from '../../../helpers/globals'
import {getNews} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'

function NewsPage() {

    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getNewsData = await getNews()
            setNewsData(getNewsData)
            console.log(getNewsData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {newsData?.filter(el => el.outstanding === true).map(el =>
                <Link to={{
                    pathname: `/noticia`,
                    state: {
                        data: el
                    }
                }} className="container-fluid p-0 NewsPage__hero" style={{
                    background: `url(${el.urlToPic}) no-repeat center center / cover`,
                }}>
                    <div className="NewsPage__container container">
                        <span>{drawTime(el.publishDate)}</span>
                        <h1>{el.title}</h1>
                        <h3>{el.subTitle}</h3>
                    </div>
                </Link>
            )}
            <div className="container NewsPage__lastest">
                <h1>Lo último</h1>
            </div>
        </>
    )
}

export default NewsPage
