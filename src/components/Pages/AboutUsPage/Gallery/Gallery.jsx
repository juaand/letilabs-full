import './Gallery.css'
import React, {useState} from 'react'
import dataGallery from '../../../../data/dataGallery'
import {Fade, Slide} from "react-awesome-reveal"

function Gallery() {

    const [backImage, setBackImage] = useState(dataGallery[0].imgPath)

    const setSelectedBg = (e, img) => {

        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active')
        })
        e.target.classList.add('active')
        setBackImage(img)
    }

    return (
        <>
            <section className="container-fluid Gallery">
                <Slide duration={600} triggerOnce>
                    <Fade>
                        <h1>Hoy contamos con lo mejor</h1>
                    </Fade>
                </Slide>
                <Fade delay={600} triggerOnce>
                    <div className="col-12 col-sm-6 Gallery__image" style={{
                        background: `url("./images/${backImage}") no-repeat center center / cover`
                    }} />
                </Fade>
            </section>
            <section className="container-fluid Gallery__nav">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <ul>
                            {
                                dataGallery.map((el, i) =>
                                    <li class={i === 0 && "active"} onClick={(e) => setSelectedBg(e, el.imgPath)}>{el.title}
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