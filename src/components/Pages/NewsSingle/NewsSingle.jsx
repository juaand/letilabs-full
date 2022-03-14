import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'

import {getRandomNews, getLinkedNews} from '../../../services/ApiClient'
import {drawTime} from '../../../helpers/globals'

import Loader from '../../Loader/Loader'

import './NewsSingle.css'

function NewsSingle(props) {

    const [getRandom, setGetRandom] = useState([])
    const [noticia, setNoticia] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            const id = props?.match?.params?.id
            const getNewsData = await getLinkedNews(id)
            setNoticia(getNewsData)
            const getRandomData = await getRandomNews()
            setGetRandom(getRandomData)
        }
        fetchData()

        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <title>{`Grupo Leti | ${noticia?.title}`}</title>
                <meta name="description" content={`Resultado de búsqueda de noticia del Grupo Leti: ${noticia?.title}`} />
                <meta name="keywords" content={`Grupo Leti, noticias Grupo Leti, ${noticia?.title}`} />
            </Helmet>
            {loading && <Loader />}
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
            <div className="container-fluid position-relative">
                <div className="List__to-top" onClick={() => window.scrollTo(0, 0)}></div>
                <Fade triggerOnce direction="up">
                    <section className="container NewsSingle__content">
                        <div className="NewsSingle__rrss">
                            <Link to={{pathname: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}} target="_blank" className="facebook" />
                            <Link to={{pathname: `https://web.whatsapp.com/send?text=${window.location.href}`}} target="_blank" className="whatsapp" />
                            <Link to={{pathname: `https://www.linkedin.com/shareArticle/?mini=true&url=${window.location.href}`}} target="_blank" className="linkedin" />
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-10 NewsSingle__content-desc">
                                <div className="NewsSingle__rrss NewsSingle__rrss-bottom">
                                    <Link to={{pathname: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}} target="_blank" className="facebook" />
                                    <Link to={{pathname: `https://web.whatsapp.com/send?text=${window.location.href}`}} target="_blank" className="whatsapp" />
                                    <Link to={{pathname: `https://www.linkedin.com/shareArticle/?mini=true&url=${window.location.href}`}} target="_blank" className="linkedin" />
                                </div>
                                <p dangerouslySetInnerHTML={{__html: noticia?.content}} />
                            </div>
                        </div>
                    </section>
                </Fade>
            </div>
            <Fade triggerOnce direction="up">
                <section className="container NewsSingle__related">
                    <div className="row justify-content-around">
                        <div className="col-12">
                            <h1>Noticias relacionadas</h1>
                        </div>
                        <Fade cascade direction="up" triggerOnce className="card NewsPage__card col-12 col-sm-5 p-0">
                            {getRandom.map(el =>
                                <>
                                    <img src={el?.urlToPic} className="card-img-top" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el?.title} />
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
