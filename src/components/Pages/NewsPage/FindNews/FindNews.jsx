import './FindNews.css'
import React, {useState} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import {Fade} from 'react-awesome-reveal'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import CheckBoxWithLabel from '../../../Form/CheckBoxWithLabel/CheckBoxWithLabel'
import {searchNews} from '../../../../services/ApiClient'
import {Link} from 'react-router-dom'
import {drawTime} from '../../../../helpers/globals'

function FindNews({title}) {

    const [getSearch, setGetSearch] = useState([])
    const [bool, setBool] = useState(false)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                search: "",
                tag: [],
            },
            error: {
                search: true,
                tag: true,
            },
            touch: {},
        },
        {
            search: v => v.length,
            tag: v => v.length,
        }
    )

    const {data} = state

    const searchSubmit = async (event) => {
        event.preventDefault()

        const getNews = await searchNews(data)
        if (getNews.length > 0) {
            setGetSearch(getNews)
            setBool(false)
        } else {
            setBool(!bool)
        }
    }

    const setTag = (e) => {
        if (!data.tag.includes(e.target.value)) {
            data.tag.push(e.target.value)
        } else {
            data.tag = (data.tag.filter(el => el !== e.target.value))
        }
    }
    return (
        <>
            <Fade direction="up" triggerOnce>
                <section className="container-fluid FindNews">
                    <div className="container">
                        <div className="row FindNews__row">
                            <div className="col-12">
                                <h1>{title?.searchTitle}</h1>
                            </div>
                            <div className="col-12">
                                <form className="FindNews__form row" onSubmit={searchSubmit}>
                                    <div className="col-12 p-0 FindNews__label">
                                        <InputWithLabel
                                            value={data.search}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="search"
                                            type="text"
                                            cssStyle="FindNews__form-input"
                                            placeholder="¿Qué buscas?"
                                        />
                                    </div>
                                    <div onClick={searchSubmit} className="col-12 p-0 col-sm-1 leti-btn" />
                                    <div className="col-12 FindNews__checkboxes">
                                        <CheckBoxWithLabel data={["Grupo Leti", "Educación", "Innovación", "Nuestra gente", "Investigación", "Salud y bienestar"]} name="themes" tabIndex="2" onChange={setTag} />
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
                                        {el.tag.map(el => <small className="FindNews__tag">{el}</small>)}
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
