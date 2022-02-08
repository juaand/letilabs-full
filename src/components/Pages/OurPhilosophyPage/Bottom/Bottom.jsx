import './Bottom.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {Link} from 'react-router-dom'
import {getBottomOurPhilosophy} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Bottom() {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBottomData = await getBottomOurPhilosophy()
            setData(getBottomData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Bottom">
                <div className="row">
                    <Fade triggerOnce delay={1400} direction="up">
                        <div className="Bottom__blue-stroke parallax-rotate" data-speed="0.1" />
                    </Fade>
                    <Fade delay={1000} direction="left" triggerOnce>
                        <div className="col-12 col-sm-6 Bottom__clip" style={{
                            background: `url("${data?.imgURL}") no-repeat center / cover`
                        }} />
                    </Fade>
                    <div className="col-11 col-sm-5 offset-sm-6 Bottom__info">
                        <Fade direction="down" triggerOnce>
                            <h1>{data?.title}</h1>
                        </Fade>
                        <p className="Bottom__desc" dangerouslySetInnerHTML={{__html: data?.description}} />
                        <Link to={data?.buttonLink} className="leti-btn">{data?.buttonTitle}</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Bottom
