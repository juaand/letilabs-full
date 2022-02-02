import './Search.css'
import React from 'react'
import {useFormState} from '../../../hooks/useFormState'
import InputWithLabel from '../InputWithLabel/InputWithLabel'
import {useHistory} from 'react-router-dom'

function Search({bool}) {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                search: ""
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
    const history = useHistory()

    const searchSubmit = (event) => {
        event.preventDefault()

        history.push({
            pathname: '/buscar',
            state: {
                buscar: data.search
            }
        })
    }

    return (
        <section className={`container-fluid Search ${bool && 'show'}`}>
                <form onSubmit={searchSubmit} className="container d-flex align-items-center">
                    <div className="Search__form">
                        <InputWithLabel
                            value={data.search}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="search"
                            type="text"
                            cssStyle="Search__form-input"
                            placeholder="Buscar..."
                        />
                    </div>
                </form>
        </section>
    )
}

export default Search
