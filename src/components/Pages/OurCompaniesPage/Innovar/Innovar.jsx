import './Innovar.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {getInnovationOC} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Innovar() {

    const [bannerData, setBannerData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getInnovationOC()
            setBannerData(getBannerData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Innovar">
                <div className={`Innovar__bubbles-mid parallax-rotate`} style={{
                    background: `url("./images/bb-big.png") no-repeat center center / contain`
                }} data-speed="0.09" />
                <div className={`Innovar__bubbles-000 parallax-rotate`} style={{
                    background: `url("./images/bb-000.png") no-repeat center center / contain`
                }} data-speed="-0.16" />
                <div className={`Innovar__bubbles-002 parallax`} style={{
                    background: `url("./images/bb-002.png") no-repeat center center / contain`
                }} data-speed="-0.16" />
                <div className={`Innovar__bubbles-big parallax-rotate`} style={{
                    background: `url("./images/bb-big.png") no-repeat center center / contain`
                }} data-speed="-0.05" />
                <div className={`Innovar__bubbles-003 parallax`} style={{
                    background: `url("./images/bb-003.png") no-repeat center center / contain`
                }} data-speed="-0.26" />
                <div className={`Innovar__bubbles-004 parallax-rotate`} style={{
                    background: `url("./images/bb-004.png") no-repeat center center / contain`
                }} data-speed="-0.16" />

                <div className={`Innovar__bubbles-005 parallax-rotate`} style={{
                    background: `url("./images/bb-005.png") no-repeat center center / contain`
                }} data-speed="-0.16" />
                <div className={`Innovar__bubbles-006 parallax-rotate`} style={{
                    background: `url("./images/bb-006.png") no-repeat center center / contain`
                }} />
                <div className={`Innovar__bubbles-007 parallax`} style={{
                    background: `url("./images/bb-007.png") no-repeat center center / contain`
                }} data-speed="0.26" data-axis="vertical" />
                <div className={`Innovar__bubbles-008 parallax-rotate`} style={{
                    background: `url("./images/bb-008.png") no-repeat center center / contain`
                }} data-speed="0.08" />
                <div className={`Innovar__bubbles-009 parallax`} style={{
                    background: `url("./images/bb-009.png") no-repeat center center / contain`
                }} data-speed="0.14" data-axis="vertical" />
                <div className={`Innovar__bubbles-0010 parallax`} style={{
                    background: `url("./images/bb-0010.png") no-repeat center center / contain`
                }} data-speed="-0.04" data-axis="vertical" />
                <div className={`Innovar__bubbles-0011 parallax`} style={{
                    background: `url("./images/bb-0011.png") no-repeat center center / contain`
                }} data-speed="0.44" data-axis="vertical" />

                <div className={`Innovar__bubbles-0012 parallax`} style={{
                    background: `url("./images/bb-0012.png") no-repeat center center / contain`
                }} data-speed="-0.26" />
                <div className={`Innovar__bubbles-0014 parallax`} style={{
                    background: `url("./images/bb-0014.png") no-repeat center center / contain`
                }} data-speed="0.44" data-axis="vertical" />
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 Innovar__title">
                        <Fade direction="left" duration={600}>
                                <h1>{bannerData?.description}</h1>
                            </Fade>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Innovar
