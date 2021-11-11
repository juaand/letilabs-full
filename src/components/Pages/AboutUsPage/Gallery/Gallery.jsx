import './Gallery.css'
import React, {useState, useEffect} from 'react'
import dataGallery from '../../../../data/dataGallery'

function Gallery() {

    const [backImage, setBackImage] = useState(dataGallery[0].imgPath)

    const setSelectedBg = (e, img) => {

        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active')
        })
        e.target.classList.add('active')
        setBackImage(img)
    }

    useEffect(() => {
        const firstLi = document.querySelector('li')
        firstLi.classList.add('active')
    }, [])

    return (
        <>
            <section className="container-fluid Gallery">
                <h1>Hoy contamos con lo mejor</h1>
                <div className="col-12 col-sm-6 Gallery__image" style={{
                    background: `url("./images/${backImage}") no-repeat center center / cover`
                }} />
            </section>
            <section className="container-fluid Gallery__nav">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <ul>
                            {
                                dataGallery.map(el =>
                                    <li onClick={(e) => setSelectedBg(e, el.imgPath)}>{el.title}
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