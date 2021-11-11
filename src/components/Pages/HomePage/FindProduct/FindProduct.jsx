import './FindProduct.css'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {useFormState} from '../../../../hooks/useFormState'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import DropdownWithLabel from '../../../Form/DropdownWithLabel/DropdownWithLabel'
import dataSpecialities from '../../../../data/dataSpecialities'


function FindProduct() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                search: "",
                especialidad: ""
            },
            error: {
                search: true,
                especialidad: true
            },
            touch: {},
        },
        {
            search: v => v.length,
            especialidad: v => v.length
        }
    )

    const {data, error, touch} = state
    const history = useHistory()

    const searchSubmit = (event) => {
        event.preventDefault()

        history.push({
            pathname: '/buscar',
            state: {
                buscar: data.search,
                hideSearchIcon: true
            }
        })
    }
    return (
        <section className="container-fluid FindProduct">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10">
                        <h1>Encuentra un producto...</h1>
                        <form onSubmit={searchSubmit} className="container">
                            <div className="FindProduct__form input-group">
                                <InputWithLabel
                                    value={data.search}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="search"
                                    type="text"
                                    className="form-control"
                                    placeholder="Escribe el nombre o condición"
                                />
                                <DropdownWithLabel
                                    placeholder="Especialidad médica"
                                    value={data.especialidad}
                                    label=""
                                    name="especialidad"
                                    onChange={onChange}
                                    className={`form-control ${touch.especialidad && error.especialidad ? "is-invalid" : ""}`}
                                    list="especialidades"
                                    data={dataSpecialities}
                                />
                                <span class="input-group-text">Buscar</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default FindProduct
