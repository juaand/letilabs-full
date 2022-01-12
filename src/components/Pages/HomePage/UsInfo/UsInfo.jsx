import './UsInfo.css'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Fade, Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import {getUsInfo} from '../../../../services/ApiClient'

function UsInfo() {

    const [getData, setGetData] = useState([])

    const customAnimation = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, -10rem, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }`

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsInfo()
            setGetData(data)
        }
        fetchData()
    }, [])

    return (
        <section className="container Nosotros">
            <div className="row">
                <div className="col-11 col-sm-6">
                    <Reveal keyframes={customAnimation}>
                        <p className="Nosotros__valor" dangerouslySetInnerHTML={{__html: getData.description}}></p>
                    </Reveal>
                    <Fade triggerOnce>
                        <Link to={{
                            pathname: `${getData?.url}`
                        }} className="leti-btn">{getData?.buttonTitle}</Link>
                    </Fade>
                </div>
                <Fade cascade duration={600} delay={300} triggerOnce>
                    <div className="leti-blue-triangle parallax-rotate" data-speed="-.1" data-axis="vertical"></div>
                    <div className="leti-red-triangle parallax-rotate" data-speed=".05" data-axis="vertical"></div>
                </Fade>
            </div>
        </section>
    )
}

export default UsInfo
