import './NewsPage.css'
import React, {useState, useEffect} from 'react'
import {drawTime} from '../../../helpers/globals'
import {getNews} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'
import {Fade} from 'react-awesome-reveal'

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
            {newsData?.filter(el => el?.outstanding === true).map(el =>
                <Link to={{
                    pathname: `/noticia`,
                    state: {
                        data: el
                    }
                }} className="container-fluid p-0 NewsPage__hero" style={{
                    background: `url(${el?.urlToPic}) no-repeat center center / cover`,
                }}>
                    <div className="NewsPage__container container">
                        <Fade triggerOnce direction="left" cascade>
                            <span>{drawTime(el?.publishDate)}</span>
                            <h1>{el?.title}</h1>
                            <h3>{el?.subTitle}</h3>
                        </Fade>
                    </div>
                </Link>
            )}
            <div className="container NewsPage__lastest">
                <h1>Lo último</h1>
                <div className="row justify-content-between">
                    <Fade cascade delay={300} direction="up" triggerOnce className="card NewsPage__card col-12 col-sm-3">
                        {newsData?.filter(el => el?.outstanding !== true).slice(0, 3).map(el =>
                            <>
                                <img src={el?.urlToPic} className="card-img-top" alt={el?.title} />
                                <div className="card-body">
                                <span className="card-time">{drawTime(el?.publishDate)}</span>
                                    <p className="card-title">{el?.title}</p>
                                    <h5 className="card-subtitle">{el?.subTitle}</h5>
                                </div>
                                <div className="card-footer">
                                    <Link className="leti-btn"></Link>
                                </div>
                            </>
                        )}
                    </Fade>
                </div>
            </div>
        </>
    )
}

export default NewsPage
