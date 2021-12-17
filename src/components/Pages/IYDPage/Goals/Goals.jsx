import './Goals.css'
import React from 'react'
import {Reveal, Fade} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import dataGoals from '../../../../data/dataGoals'

function Goals() {

    const customAnimation = keyframes`
    from {
        opacity: 0;
        transform: translate3d(-10rem, 0, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }`

    return (
        <section className="container-fluid Goals">
            <div className={`Goals__cells-001 parallax-rotate`} style={{
                background: `url("./images/cell-001.png") no-repeat center center / contain`
            }} data-speed="-0.46" />
            <div className={`Goals__cells-002 parallax`} style={{
                background: `url("./images/cell-002.png") no-repeat center center / contain`
            }} data-speed="-0.16" />
            <div className={`Goals__cells-003 parallax`} style={{
                background: `url("./images/cell-003.png") no-repeat center center / contain`
            }} data-speed="-0.26" />
            <div className={`Goals__cells-004 parallax-rotate`} style={{
                background: `url("./images/cell-004.png") no-repeat center center / contain`
            }} data-speed="-0.16" />
            <div className={`Goals__cells-005 parallax-rotate`} style={{
                background: `url("./images/cell-005.png") no-repeat center center / contain`
            }} data-speed="-0.16" />
            <div className={`Goals__cells-006 parallax`} style={{
                background: `url("./images/cell-006.png") no-repeat center center / contain`
            }} data-speed="-0.16" data-axis="vertical" />
            <div className={`Goals__cells-007 parallax`} style={{
                background: `url("./images/cell-007.png") no-repeat center center / contain`
            }} data-speed="0.26" data-axis="vertical" />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 Goals__title">
                        <Reveal keyframes={customAnimation} triggerOnce>
                            <h1>Qué queremos lograr</h1>
                        </Reveal>
                    </div>
                    <div className="col-12 col-sm-6 Goals__goals">
                        {dataGoals.map((el, key) =>
                            <Fade triggerOnce cascade direction="up">
                                <p className="Goals__number">{key + 1}</p>
                                <div className="Goals__info">
                                    <p className="Goals__subtitle">{el.title}</p>
                                    <p className="Goals__desc">{el.desc}</p>
                                </div>
                            </Fade>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Goals
