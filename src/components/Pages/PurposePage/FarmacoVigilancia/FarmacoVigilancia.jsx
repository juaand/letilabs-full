import './FarmacoVigilancia.css'
import React, {useState, useEffect} from 'react'

import ModalFarmacoVigilancia from '../../HomePage/ModalFarmacoVigilancia/ModalFarmacoVigilancia'
import {getFarmaco} from '../../../../services/ApiClient'
import {Fade} from 'react-awesome-reveal'
import Loader from '../../../Loader/Loader'

function FarmacoVigilancia() {

    const [bool, setBool] = useState(false)
    const [farmaco, setFarmaco] = useState()
    const [loading, setLoading] = useState(true)

    const showModal = () => {
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getFarmacoData = await getFarmaco()
            setFarmaco(getFarmacoData)
        }
        fetchData()
        setLoading(!loading)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Fade direction="up" triggerOnce>
                <section className="container FarmacoVigilancia__form FarmacoVigilancia__form-purpose">
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
