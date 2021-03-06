import './Goals.css'
import React, {useState, useEffect} from 'react'
import {Reveal, Fade} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import {getGoalsIdData} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Goals() {

    const [dataGoals, setDataGoals] = useState([])
    const [loading, setLoading] = useState(true)

    const customAnimation = keyframes`
    from {
        opacity: 0;
        transform: translate3d(-10rem, 0, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }`

    useEffect(() => {
        const fetchData = async () => {
            const getGoalsData = await getGoalsIdData()
            setDataGoals(getGoalsData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
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
                                <h1>{dataGoals[0]?.title}</h1>
                            </Reveal>
                        </div>
                        <div className="col-12 col-sm-6 Goals__goals">
                            {dataGoals?.map((el, key) =>
                                <Fade triggerOnce cascade direction="up">
                                    <p className="Goals__number">{key + 1}</p>
                                    <div className="Goals__info">
                                        <p className="Goals__subtitle">{el.name}</p>
                                        <p className="Goals__desc" dangerouslySetInnerHTML={{__html: el.desc}} />
                                    </div>
                                </Fade>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Goals
