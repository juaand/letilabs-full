import './Video.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Video() {
    return (
        <Fade triggerOnce direction="up" duration={600}>
            <section className="container-fluid Video__purpose">
                <img src="./images/play.svg" alt="play" />
            </section>
        </Fade>
    )
}

export default Video
