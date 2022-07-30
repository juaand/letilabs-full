import './LetiNews.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {drawTime} from '../../../../helpers/globals'

function LetiNews({newsData, title}) {
    return (
        <div className="container-fluid p-0 NewsPage__leti">
            <div className="row">
                <div className="col-12 col-sm-5 offset-sm-2 NewsPage__leti-resume">
                    <div className="container">
                        <img className="NewsPage__leti__logo" src="./images/grupo-leti.svg" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="leti" />
                    </div>
                    <Fade cascade direction="right" triggerOnce className="card NewsPage__card col-12">
                        {newsData?.filter(el => el?.tag[0] === 'Grupo Leti').slice(0, 2).map(el =>
                            <>
                                <div className="card-body">
                                    <span className="card-time">{drawTime(el?.publishDate)}</span>
                                    {el.tag.map(el => <small className="FindNews__tag">{el}</small>)}
                                    <p className="card-title">{el?.title}</p>
                                    <h5 className="card-subtitle">{el?.subTitle}</h5>
                                </div>
                                <div className="card-footer">
                                    <Link to={{
                                        pathname: `/noticia/${el?.id}`
                                    }} className="leti-btn"></Link>
                                </div>
                            </>
                        )}
                    </Fade>
                </div>
                <div className="col-12 col-sm-5 NewsPage__leti-hero">
                    <Fade cascade delay={300} direction="up" triggerOnce className="card NewsPage__leti__card col-12">
                        <img src={title?.picPath} className="card-img-top" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="Noticias destacadas Grupo LETI" />
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default LetiNews
