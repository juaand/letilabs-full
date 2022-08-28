import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"

import './MarcandoPauta.css'
import {getMarcandoPauta} from '../../../../services/ApiClient'

function MarcandoPauta() {

    const [marcandoPautaData, setMarcandoPautaData] = useState()

    useEffect(() => {
        const counters = document.querySelectorAll('.value')
        const speed = 200

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('akhi')
                const data = +counter.innerText

                const time = value / speed
                if (data < value) {
                    counter.innerText = Math.ceil(data + time)
                    setTimeout(animate, 1)
                } else {
                    counter.innerText = value
                }

            }

            animate()
        })

        const fetchData = async () => {
            const getMarcandoPautaData = await getMarcandoPauta()
            setMarcandoPautaData(getMarcandoPautaData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid MarcandoPauta">
            <div className="row justify-content-between">
                <div className="col-12 col-sm-5 MarcandoPauta__text">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-9 offset-sm-5">
                            <Fade direction="down" triggerOnce>
                                <p dangerouslySetInnerHTML={{__html: marcandoPautaData?.description}} />
                            </Fade>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 MarcandoPauta__bg" style={{
                    background: `url(${marcandoPautaData?.imgURL}) no-repeat center / contain`,
                }}>
                    <div className="MarcandoPauta__absolute">Más de <span className="value" akhi="70">0</span> años <div className="red-text">marcando la pauta</div></div></div>
            </div>
        </section>
    )
}

export default MarcandoPauta

