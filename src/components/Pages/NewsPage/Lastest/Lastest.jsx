import './Lastest.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {drawTime} from '../../../../helpers/globals'

function Lastest({newsData}) {
    return (
        <div className="container NewsPage__lastest">
            <h1>Lo último</h1>
            <div className="row justify-content-between">
                <Fade cascade delay={300} direction="up" triggerOnce className="card NewsPage__card col-12 col-sm-3">
                    {newsData?.filter(el => el.tag[0] !== 'Grupo Leri').map(el =>
                        <>
                            <img src={el?.urlToPic} className="card-img-top" alt={el?.title} />
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
    )
}

export default Lastest
