import './Video.css'
import React from 'react'

function Video() {
    return (
        <section className="container-fluid Video">
            <video loop muted autoPlay poster="" className="fullscreen-bg__video">
                <source src="./video/home-video.mp4" type="video/mp4" />
            </video>
        </section>
    )
}

export default Video
