import './Most.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {drawTime} from '../../../../helpers/globals'

function Most({newsData, title}) {
    return (
        <div className="container-fluid p-0 NewsPage__most">
            <div className="container">
                <h1>{title?.mostTitle}</h1>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 NewsPage__most-hero">
                    <Fade cascade delay={300} direction="up" triggerOnce className="card NewsPage__card col-12">
                        {newsData?.filter(el => el?.outstanding !== true).slice(3, 4).map(el =>
                            <>
                                <img src={el?.urlToPic} className="card-img-top" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.title} />
                                <div className="card-body">
                                    <span className="card-time">{drawTime(el?.publishDate)}</span>
                                    {el.tag.map(el => <small className="FindNews__tag">{el}</small>)}
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
                                    {el.tag.map(el => <small className="FindNews__tag">{el}</small>)}
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
    )
}

export default Most
