import './Gallery.css'
import React, {useState} from 'react'
import dataGallery from '../../../../data/dataGallery'
import {Fade} from "react-awesome-reveal"

function Gallery() {

    const [backImage, setBackImage] = useState(dataGallery[0].imgPath)
    const [itemDesc, setItemDesc] = useState(dataGallery[0].desc)

    const setSelectedBg = (e, img, desc) => {

        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active')
        })
        e.target.classList.add('active')
        setBackImage(img)
        setItemDesc(desc)
    }

    return (
        <>
            <section className="container-fluid Gallery">
                <Fade direction="left" duration={600} triggerOnce>
                    <h1>Hoy contamos con lo mejor</h1>
                </Fade>
                <Fade delay={600} triggerOnce>
                    <div className="col-12 col-sm-6 Gallery__image" style={{
                        background: `url("./images/${backImage}") no-repeat center center / cover`
                    }}>
                        <p className="Gallery__desc row">
                            <span className="col-sm-11 col-12">{itemDesc}</span>
                        </p>
                    </div>
                </Fade>
            </section>
            <section className="container-fluid Gallery__nav">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <ul>
                            {
                                dataGallery.map((el, i) =>
                                    <li class={i === 0 && "active"} onClick={(e) => setSelectedBg(e, el.imgPath, el.desc)}>{el.title}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Gallery