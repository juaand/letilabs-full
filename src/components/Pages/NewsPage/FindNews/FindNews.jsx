import './FindNews.css'
import React, {useState} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import {Fade} from 'react-awesome-reveal'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import {searchNews} from '../../../../services/ApiClient'
import {Link} from 'react-router-dom'
import {drawTime} from '../../../../helpers/globals'

function FindNews() {

    const [getSearch, setGetSearch] = useState([])
    const [bool, setBool] = useState(false)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                search: "",
            },
            error: {
                search: true,
            },
            touch: {},
        },
        {
            search: v => v.length,
        }
    )

    const {data} = state

    const searchSubmit = async (event) => {
        event.preventDefault()
        console.log(data.search)
        const getNews = await searchNews(data.search)
        if (getNews.length > 0) {
            setGetSearch(getNews)
            setBool(false)
        } else {
            setBool(!bool)
        }
        console.log(getNews)
    }

    return (
        <>
            <Fade direction="up" triggerOnce>
                <section className="container-fluid FindNews">
                    <div className="container">
                        <div className="row FindNews__row">
                            <div className="col-12">
                                <h1>Artículos</h1>
                                <form className="FindNews__form" onSubmit={searchSubmit}>
                                    <div className="input-group">
                                        <div className="col-12 p-0 FindNews__label">
                                            <InputWithLabel
                                                value={data.search}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                name="search"
                                                type="text"
                                                className="FindNews__form-input"
                                                placeholder="¿Qué buscas?"
                                            />
                                        </div>
                                        <div onClick={searchSubmit} className="col-12 p-0 col-sm-1 leti-btn">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </section>
            </Fade>
            {!bool && getSearch.length > 0 &&
                <section className="container FindNews">
                    <div className="row justify-content-around">
                        <Fade cascade direction="up" triggerOnce className="card NewsPage__card col-12 col-sm-5">
                            {getSearch.map(el =>
                                <>
                                    <img src={el?.urlToPic} className="card-img-top" alt={el?.title} />
                                    <div className="card-body">
                                        <span className="card-time">{drawTime(el?.publishDate)}</span>
                                        <p className="card-title">{el?.title}</p>
                                        <h5 className="card-subtitle">{el?.subTitle}</h5>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={{
                                            pathname: `/noticia`,
                                            state: {
                                                data: el
                                            }
                                        }} className="leti-btn"></Link>
                                    </div>
                                </>
                            )}
                        </Fade>
                    </div>
                </section>
            }
            {bool &&
                <section className="container FindNews__noResults">
                    <div className="row">
                        <p>Lo sentimos, pero no se han encontrado resultados para <span className="blue-text">{data.search}</span>.</p>
                        <p>Asegúrate que todas las palabras están escritas correctamente.</p>
                        <p>Prueba con diferentes palabras clave.</p>
                        <p>Prueba con palabras más generales.</p>
                        <p>¿Sigues sin conseguir la respuesta? Envíanos un correo electrónico con tu pregunta y trataremos de ayudarte.</p>
                    </div>
                </section>
            }
        </>
    )
}

export default FindNews
