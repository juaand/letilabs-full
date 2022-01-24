import './FarmacoVigilancia.css'
import React, {useState, useEffect} from 'react'
import ModalFarmacoVigilancia from '../ModalFarmacoVigilancia/ModalFarmacoVigilancia'
import {Fade} from 'react-awesome-reveal'
import {getFarmaco, getHomeBottom} from '../../../../services/ApiClient'
import {Link} from 'react-router-dom'

function FarmacoVigilancia() {

    const [bool, setBool] = useState(false)
    const [farmaco, setFarmaco] = useState()
    const [homeBottom, setHomeBottom] = useState()

    const showModal = () => {
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getFarmacoData = await getFarmaco()
            setFarmaco(getFarmacoData)
        }
        fetchData()

        const fetchHomeBottom = async () => {
            const getHomeBottomData = await getHomeBottom()
            setHomeBottom(getHomeBottomData)
        }
        fetchHomeBottom()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <section className="container-fluid FarmacoVigilancia">
                <div className="row">
                    {homeBottom?.map((el, key) =>
                        <div className="col-12 col-sm-6 p-0 FarmacoVigilancia__img">
                            <div className="FarmacoVigilancia__espacio" style={{
                                background: `url("./images/${el?.img}")`,
                            }} />
                            <div className="FarmacoVigilancia__title">
                                <Fade {...key > 1 && `delay=${300}`} direction="up" triggerOnce>
                                    <h2>{el?.title}</h2>
                                    {el?.url?.includes('http') ?
                                        <a href={el?.url} target="_blank" className="leti-btn" rel="noopener noreferrer">{el?.button}</a>
                                        :
                                        <Link to={el?.url} className="leti-btn">{el?.button}</Link>
                                    }
                                </Fade>
                            </div>
                        </div>)}
                </div>
            </section>
            <Fade direction="up" triggerOnce>
                <section className="container FarmacoVigilancia__form">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-6 FarmacoVigilancia__texto">
                            <strong>{farmaco?.title}</strong>
                            <p dangerouslySetInnerHTML={{__html: farmaco?.subTitle}}></p>
                        </div>
                        <div className="col-11 col-sm-6 d-flex align-items-center">
                            <div className="leti-btn" onClick={showModal}>{farmaco?.buttonTitle}</div>
                        </div>
                    </div>
                </section>
            </Fade>
            {bool && <ModalFarmacoVigilancia hideModal={() => setBool(!bool)} />}
        </>
    )
}

export default FarmacoVigilancia
