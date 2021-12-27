import './NewsPage.css'
import React, {useState, useEffect} from 'react'
import {drawTime} from '../../../helpers/globals'
import {getNews} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'
import {Fade} from 'react-awesome-reveal'
import Banner from './Banner/Banner'
import Lastest from './Lastest/Lastest'

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
            <Banner newsData={newsData?.filter(el => el?.outstanding === true)}/>
            <Lastest newsData={newsData?.filter(el => el?.outstanding !== true).slice(0, 3)}/>
            <div className="container-fluid p-0 NewsPage__most">
                <div className="container">
                    <h1>Lo más leído</h1>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6 NewsPage__most-hero">
                        <Fade cascade delay={300} direction="up" triggerOnce className="card NewsPage__card col-12">
                            {newsData?.filter(el => el?.outstanding !== true).slice(3, 4).map(el =>
                                <>
                                    <img src={el?.urlToPic} className="card-img-top" alt={el?.title} />
                                    <div className="card-body">
                                        <span className="card-time">{drawTime(el?.publishDate)}</span>
                                        <p className="card-title">{el?.title}</p>
                                        <h5 className="card-subtitle">{el?.subTitle}</h5>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={{
                                            pathname: `/noticia`,
                                            state: {
                                                data: el
                                            }
                                        }} className="leti-btn"></Link>
                                    </div>
                                </>
                            )}
                        </Fade>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1 NewsPage__most-resume">
                        <Fade cascade direction="right" triggerOnce className="card NewsPage__card col-12">
                            {newsData?.filter(el => el?.outstanding !== true).slice(4, 7).map(el =>
                                <>
                                    <div className="card-body">
                                        <span className="card-time">{drawTime(el?.publishDate)}</span>
                                        <p className="card-title">{el?.title}</p>
                                        <h5 className="card-subtitle">{el?.subTitle}</h5>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={{
                                            pathname: `/noticia`,
                                            state: {
                                                data: el
                                            }
                                        }} className="leti-btn"></Link>
                                    </div>
                                </>
                            )}
                        </Fade>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NewsPage
