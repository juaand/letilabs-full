import './Science.css'

import {Fade} from 'react-awesome-reveal'

import dataScience from '../../../../data/dataScience'

function Science() {
    return (
        <Fade direction="up" triggerOnce>
            <section className="container-fluid Science__leti">
                    {dataScience?.map(el =>
                        <>
                            <div className="Science__leti__product row">
                                <div className="Science__leti__image col-12 col-sm-6" style={{
                                    background: `url(${el?.imgURL}) no-repeat left center / cover`
                                }}></div>
                                <div className="col-12 col-sm-6 Science__leti__info">
                                <h1 class="Science__title">{el?.title}</h1>
                                    <div className="row">
                                        <p className="col-12 col-sm-6 Science__leti__desc" dangerouslySetInnerHTML={{__html: el?.desc}}>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
            </section>
        </Fade>
    )
}

export default Science