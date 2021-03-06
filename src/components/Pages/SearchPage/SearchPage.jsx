import './SearchPage.css'
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../hooks/useFormState'
import {searchContent} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import Loader from '../../Loader/Loader'

function SearchPage(props) {

    const searchSentence = props?.location?.state?.buscar

    const [matches, setMatches] = useState([])
    const [newSearch, setNewSearch] = useState(searchSentence)
    const [loading, setLoading] = useState(true)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                search: searchSentence
            },
            error: {
                search: true
            },
            touch: {},
        },
        {
            search: v => v.length
        }
    )

    const {data} = state

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1).toLowerCase().replace(`${searchSentence.toLowerCase()}`, `<span class="blue-text">${searchSentence}</span>`) + '...' : string.toLowerCase().replace(`${searchSentence.toLowerCase()}`, `<span class="blue-text">${searchSentence}</span>`) + '...'
    }

    const searchSubmit = (event) => {
        event.preventDefault()
        data.search = event.target.search.value
        setNewSearch(event.target.search.value)

        //Busqueda de contenido en la API
        const fetchData = async () => {
            const contentData = await searchContent(data.search)
            setMatches(contentData)
        }
        fetchData()
    }

    useEffect(() => {

        const searchOpen = document.querySelector('.show')
        if (searchOpen) {
            searchOpen.classList.remove('show')
        }

        //Busqueda de contenido en la API
        const fetchData = async () => {
            const contentData = await searchContent(data.search)
            setMatches(contentData)
        }
        fetchData()
        setLoading(!loading)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Helmet>
                <title>Grupo LETI | Buscar</title>
                <meta name="description" content="Resultados de b??squeda" />
                <meta name="keywords" content="Grupo LETI,  Nuestras empresas, LETI" />
            </Helmet>
            <section className="container-fluid SearchPage">
                <div className="row">
                    <div className="col-12 SearchPage__bg"></div>
                </div>
                <div className="container">
                    <form onSubmit={searchSubmit}>
                        <InputWithLabel
                            value={data.search}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="search"
                            type="text"
                            cssStyle="Search__form-input SearchPage__form-input"
                            placeholder="Buscar..."
                        />
                    </form>
                    {matches.length > 0 ?
                        <p className="SearchPage__resultados">
                            Resultados {matches.length} ??? {matches.length} de {matches.length} para <span className="blue-text">{newSearch}</span>
                        </p>
                        :
                        <div className="row">
                            <p className="col-12 col-sm-6 SearchPage__resultados-vacio">
                                <p>Lo sentimos, pero no se han encontrado resultados para <span className="blue-text">{newSearch}</span>.</p>

                                <p>Aseg??rate que todas las palabras est??n escritas correctamente.</p>
                                <p>Prueba con diferentes palabras clave.</p>
                                <p>Prueba con palabras m??s generales.</p>
                                <p>??Sigues sin conseguir la respuesta? Env??anos un correo electr??nico con tu pregunta y trataremos de ayudarte.</p>
                            </p>
                        </div>
                    }
                </div>
                <div className="container">
                    <div className="row">
                        {matches.map(match =>
                            <div className="col-12 SearchPage__resultados-matchs">
                                <Link className="SearchPage__link" to={match.url}>
                                    <p className="SearchPage__title">{match.name} | Grupo LETI</p>
                                    <p className="SearchPage__url">{document.location.origin}{match.url}</p>
                                </Link>
                                <p className="SearchPage__content" dangerouslySetInnerHTML={{__html: `${truncate(match.content, 110)}`}}>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchPage
