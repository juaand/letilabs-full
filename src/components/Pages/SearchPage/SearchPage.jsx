import './SearchPage.css'
import React, {useEffect} from 'react'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../hooks/useFormState'

function SearchPage(props) {

    const searchSentence = props?.location?.state.buscar
    const hideSearchIcon = props?.location?.state.hideSearchIcon

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

    useEffect(() => {
        const searchOpen = document.querySelector('.show')
        if (searchOpen) {
            searchOpen.classList.remove('show')
        }

        //Se setea el icono de la lupa en la cabecera
        if (hideSearchIcon) {
            document.querySelector('.Header__search').classList.remove('Header__search-close')
        }
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
                <p className="SearchPage__resultados">Resultados 1 – 5 de 5 para <span className="blue-text">{searchSentence}</span></p>
            </div>
        </section>
    )
}

export default SearchPage
