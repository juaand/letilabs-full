import './Video.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Video() {
    return (
        <Fade triggerOnce direction="up">
            <section className="container-fluid Video__tech-title">
                <h1>¡Recorre nuestras instalaciones!</h1>
            </section>
            <section className="container-fluid Video__tech">
                <img src="./images/play.svg" alt="play" />
            </section>
        </Fade>
    )
}

export default Video
