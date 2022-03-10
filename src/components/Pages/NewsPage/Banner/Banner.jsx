import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {drawTime} from '../../../../helpers/globals'

function Banner({newsData}) {

    return (
        <>
            {newsData?.map(el =>
                <Link to={{pathname: `/noticia/${el?.id}`}}
                    className="container-fluid p-0 NewsPage__hero" style={{
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
        </>
    )
}

export default Banner
