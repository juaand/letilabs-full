import './NewsSingle.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {drawTime} from '../../../helpers/globals'
import {Link} from 'react-router-dom'
import {getRandomNews} from '../../../services/ApiClient'

function NewsSingle(props) {
    const noticia = props?.location?.state?.data

    const [getRandom, setGetRandom] = useState([])

    useEffect(() => {
        window.scrollTo(0,0)
        const fetchData = async () => {
            const getRandomData = await getRandomNews()
            setGetRandom(getRandomData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <section className="container-fluid NewsSingle__Banner" style={{
                background: `url(${noticia?.urlToPic}) no-repeat center center / cover`,
            }}>
                <div className="container NewsSingle__Banner__container">
                    <div className="row">
                        <div className="col-12">
                            <span>{drawTime(noticia?.publishDate)}</span>
                            <h1>{noticia?.title}</h1>
                            <h3>{noticia?.subTitle}</h3>
                        </div>
                    </div>
                </div>
            </section>
            <Fade triggerOnce direction="up">
                <section className="container NewsSingle__content">
                    <div className="NewsSingle__rrss">
                        <div className="facebook" />
                        <div className="instagram" />
                        <div className="linkedin" />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-10 NewsSingle__content-desc">
                            <div className="NewsSingle__rrss NewsSingle__rrss-bottom">
                                <div className="facebook" />
                                <div className="instagram" />
                                <div className="linkedin" />
                            </div>
                            {noticia.content}
                        </div>
                    </div>
                </section>
            </Fade>
            <Fade triggerOnce direction="up">
                <section className="container NewsSingle__related">
                    <div className="row justify-content-around">
                        <div className="col-12">
                            <h1>Noticias relacionadas</h1>
                        </div>
                        <Fade cascade direction="up" triggerOnce className="card NewsPage__card col-12 col-sm-5 p-0">
                            {getRandom.map(el =>
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
                </section>
            </Fade>
        </>
    )
}

export default NewsSingle
