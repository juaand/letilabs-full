import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Fade} from 'react-awesome-reveal'

import './FindNews.css'
import {useFormState} from '../../../../hooks/useFormState'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import CheckBoxWithLabel from '../../../Form/CheckBoxWithLabel/CheckBoxWithLabel'
import {searchNews, getTags} from '../../../../services/ApiClient'
import {drawTime} from '../../../../helpers/globals'


function FindNews({title}) {

    const [getSearch, setGetSearch] = useState([])
    const [bool, setBool] = useState(false)
    const [allTagsData, setAllTagsData] = useState([])

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

    useEffect(() => {
        const fetchData = async () => {
            const allTags = await getTags()
            setAllTagsData(allTags)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                                            placeholder="??Qu?? buscas?"
                                        />
                                    </div>
                                    <div onClick={searchSubmit} className="col-12 p-0 col-sm-1 leti-btn" />
                                    <div className="col-12 FindNews__checkboxes">
                                        <CheckBoxWithLabel data={allTagsData?.map(el => el.tag)} name="themes" tabIndex="2" onChange={setTag} />
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
                                    <img src={el?.urlToPic} className="card-img-top" onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el?.title} />
                                    <div className="card-body">
                                        <span className="card-time">{drawTime(el?.publishDate)}</span>
                                        {el.tag.map(el => <small className="FindNews__tag">{el}</small>)}
                                        <p className="card-title">{el?.title}</p>
                                        <h5 className="card-subtitle">{el?.subTitle}</h5>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={{pathname: `/noticia/${el?.id}`}} className="leti-btn"></Link>
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
                        <p>Aseg??rate que todas las palabras est??n escritas correctamente.</p>
                        <p>Prueba con diferentes palabras clave.</p>
                        <p>Prueba con palabras m??s generales.</p>
                        <p>??Sigues sin conseguir la respuesta? Env??anos un correo electr??nico con tu pregunta y trataremos de ayudarte.</p>
                    </div>
                </section>
            }
        </>
    )
}

export default FindNews
