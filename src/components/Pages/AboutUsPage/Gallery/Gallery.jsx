import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"

import './Gallery.css'
import {getGallery} from '../../../../services/ApiClient'

function Gallery() {


    const [dataGallery, setDataGallery] = useState([])
    const [backImage, setBackImage] = useState('')
    const [itemDesc, setItemDesc] = useState('')

    const setSelectedBg = (e, img, desc) => {
        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active')
        })
        e.target.classList.add('active')
        setBackImage(img)
        setItemDesc(desc)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getGalleryData = await getGallery()
            setDataGallery(getGalleryData)
            setBackImage(getGalleryData[0].imgPath)
            setItemDesc(getGalleryData[0].desc)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <section className="container-fluid Gallery">
                <Fade direction="left" duration={600} triggerOnce>
                    <h1>{dataGallery[0]?.mainTitle}</h1>
                </Fade>
                <Fade delay={600} triggerOnce>
                    <div className="col-12 col-sm-6 Gallery__image" style={{
                        background: `url("${backImage}") no-repeat center center / cover`
                    }}>
                    {itemDesc && 
                        <p className="Gallery__desc row">
                            <span dangerouslySetInnerHTML={{__html: itemDesc}} className="col-sm-11 col-12"/>
                        </p>
                    }
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