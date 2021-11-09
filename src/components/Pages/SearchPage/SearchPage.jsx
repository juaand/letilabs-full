import './SearchPage.css'
import React, {useState, useEffect} from 'react'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../hooks/useFormState'
import {searchContent} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'

function SearchPage(props) {

    const searchSentence = props?.location?.state.buscar
    const hideSearchIcon = props?.location?.state.hideSearchIcon

    const title = props.title || 'Buscar'

    //"the fox jumped over the fence".replace(/fox/,"<span class="blue-text">fox</span>")

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
    const [matches, setMatches] = useState([])

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1).toLowerCase().replace(`${searchSentence.toLowerCase()}`, `<span class="blue-text">${searchSentence}</span>`) + '...' : string.toLowerCase().replace(`${searchSentence.toLowerCase()}`, `<span class="blue-text">${searchSentence}</span>`) + '...'
    }

    useEffect(() => {

        document.title = `Grupo Leti | ${title}`


        const searchOpen = document.querySelector('.show')
        if (searchOpen) {
            searchOpen.classList.remove('show')
        }

        //Se setea el icono de la lupa en la cabecera
        if (hideSearchIcon) {
            document.querySelector('.Header__search').classList.remove('Header__search-close')
        }

        //Busqueda de contenido en la API
        const fetchData = async () => {
            const contentData = await searchContent(data.search)
            setMatches(contentData)
        }
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid SearchPage">
            <div className="row">
                <div className="col-12 SearchPage__bg"></div>
            </div>
            <div className="container">
                <InputWithLabel
                    value={data.search}
                    onBlur={onBlur}
                    onChange={onChange}
                    name="search"
                    type="text"
                    className="Search__form-input SearchPage__form-input"
                    placeholder="Buscar..."
                />
                <p className="SearchPage__resultados">Resultados 1 – {matches.length} de {matches.length} para <span className="blue-text">{searchSentence}</span></p>
            </div>
            <div className="container">
                <div className="row">
                    {matches.map(match =>
                        <div className="col-12 SearchPage__resultados-matchs">
                            <Link className="SearchPage__link" to={match.url}>
                                <p className="SearchPage__title">{match.name} | Grupo Leti</p>
                                <p className="SearchPage__url">{document.location.origin}{match.url}</p>
                            </Link>
                            <p className="SearchPage__content" dangerouslySetInnerHTML={{__html: `${truncate(match.content, 110)}`}}>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SearchPage
