import './BottomCta.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getBottomOC} from '../../../../services/ApiClient'
import {Link} from 'react-router-dom'

function BottomCta() {

    const [ourCompaniesOCData, setOurCompaniesOCData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getOurCompaniesOCData = await getBottomOC()
            setOurCompaniesOCData(getOurCompaniesOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid BottomCta">
            <div className="row">
                {ourCompaniesOCData?.map((el, key) =>
                    <div className="col-12 col-sm-6 p-0 BottomCta__img">
                        {key === 0 ? <div className="BottomCta__talento" /> :
                            <div className="BottomCta__megat" />}
                        <div className="BottomCta__title">
                            <Fade {...key > 1 && `delay=${300}`} direction="up" triggerOnce>
                                <h2>{el?.title}</h2>
                                {el?.url?.includes('http') ?
                                    <a href={el?.url} target="_blank" className="leti-btn" rel="noopener noreferrer">{el?.button}</a>
                                    :
                                    <Link to={el?.url} className="leti-btn">{el?.button}</Link>
                                }
                            </Fade>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BottomCta
