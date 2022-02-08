import './BottomCta.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {getBottomOurPeople} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'


function BottomCta() {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getBottomData = await getBottomOurPeople()
            setData(getBottomData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid BottomCta">
                <div className="row">
                    {data?.map((el, key) =>
                        <div className="col-12 col-sm-6 p-0 BottomCta__img">
                            {key === 0 ? <div className="BottomCta__instalaciones" style={{
                                background: `url("${el?.img}") no-repeat center center / cover`
                            }} /> :
                                <div className="BottomCta__empresas" style={{
                                    background: `url("${el?.img}") no-repeat center center / cover`
                                }} />}
                            <div className="BottomCta__title">
                                <Fade {...key > 1 && `delay=${300}`} direction="up" triggerOnce>
                                    <h2>{el?.title}</h2>
                                    {el?.url?.includes('http') ?
                                        <a href={el?.buttonLink} target="_blank" className="leti-btn" rel="noopener noreferrer">{el?.buttonTitle}</a>
                                        :
                                        <Link to={el?.buttonLink} className="leti-btn">{el?.buttonTitle}</Link>
                                    }
                                </Fade>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default BottomCta
