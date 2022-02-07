import './Bottom.css'
import React, {useState} from 'react'
import {Fade} from "react-awesome-reveal"
import QuestionModal from '../QuestionModal/QuestionModal'

function Bottom({info}) {

    const [bool, setBool] = useState(false)

    return (
        <>
            {bool && <QuestionModal hideModal={() => setBool(!bool)} />}
            <section className="container-fluid ProductBottom">
                <div className="row">
                    <Fade triggerOnce delay={400} direction="up">
                        <div className="ProductBottom__blue-stroke parallax-rotate" data-speed="0.1" />
                    </Fade>
                    <Fade direction="left" triggerOnce>
                        <div className="col-12 col-sm-6 ProductBottom__clip" style={{
                            background: `url("${info?.imgURL}") no-repeat left 10rem / cover`
                        }} />
                    </Fade>
                    <div className="col-11 col-sm-5 offset-sm-5 ProductBottom__info">
                        <Fade direction="down" triggerOnce>
                            <h1 dangerouslySetInnerHTML={{__html: info?.title}} />
                        </Fade>
                        <div className="leti-btn" onClick={() => setBool(!bool)}>{info?.buttonTitle}</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Bottom
