import './SearchPage.css'
import React from 'react'

function SearchPage(props) {

    const searchSentence = props?.location?.state.buscar
    return (
        <div>
            <h1>Esta buscando {searchSentence}</h1>
        </div>
    )
}

export default SearchPage
