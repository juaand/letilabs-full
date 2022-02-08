import './Unidades.css'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {seoURL} from '../../../../hooks/seoURL'
import {Fade} from "react-awesome-reveal"
import {getUnidades} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Unidades() {

    const [bool, setBool] = useState(true)
    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (window.screen.width <= 576) {
            setBool(false)
        }


        const fetchData = async () => {
            const data = await getUnidades()
            setGetData(data)
        }
        fetchData()
        setLoading(!loading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="Unidades">
                <div className="big-gray-triangle"></div>
                <div className="small-gray-triangle"></div>
                <div className="container">
                    <Fade triggerOnce>
                        <h1 dangerouslySetInnerHTML={{__html: getData[0]?.mainTitle}} />
                    </Fade>
                </div>
                <div className="container-fluid Unidades__logos">
                    {getData.map((el, i) =>
                        <>
                            {bool && i % 2 !== 0 ?
                                <Fade delay={600} triggerOnce>
                                    <div className="row Unidades__row justify-content-end">
                                        <div className="col-12 col-sm-4 Unidades__desc Unidades__desc__right">
                                            <p>{el.desc}</p>
                                            <Link to={`/${seoURL(el.name).toLowerCase()}`} className="Unidades__square-btn"></Link>
                                        </div>
                                        <div className="col-12 col-sm-5 Unidades__logo" style={{
                                            background: `#f5f5f5 url("./images/${el.name.toLowerCase()}.svg") no-repeat center center / contain`
                                        }}></div>
                                    </div>
                                </Fade>
                                :
                                <Fade delay={600} triggerOnce>
                                    <div className="row Unidades__row">
                                        <div className="col-12 col-sm-5 Unidades__logo" style={{
                                            background: `#f5f5f5 url("./images/${seoURL(el.name).toLowerCase()}.svg") no-repeat center center / contain`
                                        }}></div>
                                        <div className="col-12 col-sm-4 Unidades__desc">
                                            <p>{el.desc}</p>
                                            <Link to={`/${seoURL(el.name).toLowerCase()}`} className="Unidades__square-btn"></Link>
                                        </div>
                                    </div>
                                </Fade>
                            }
                        </>
                    )}
                </div>
            </section>
        </>
    )
}

export default Unidades
