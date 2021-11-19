import './FindProduct.css'
import React from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import DropdownWithLabel from '../../../Form/DropdownWithLabel/DropdownWithLabel'
import dataSpecialities from '../../../../data/dataSpecialities'
import {Slide} from 'react-awesome-reveal'


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

    const searchSubmit = (event) => {
        event.preventDefault()

        console.log('comming soon')

        // history.push({
        //     pathname: '/buscar',
        //     state: {
        //         buscar: data.search,
        //         hideSearchIcon: true
        //     }
        // })
    }
    return (
        <section className="container-fluid FindProduct">
            <div className="container">
                <div className="row FindProduct__row">
                    <div className="col-12 col-sm-10">
                        <Slide direction="down" triggerOnce>
                            <h1>Encuentra un producto...</h1>
                        </Slide>
                        <form className="FindProduct__form">
                            <div className="input-group">
                                <div className="col-12 p-0 col-sm-7 FindProduct__label">
                                    <InputWithLabel
                                        value={data.search}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        name="search"
                                        type="text"
                                        className="InputWithLabel form-control"
                                        placeholder="Escribe el nombre o condición"
                                    />
                                </div>
                                <div className="col-12 p-0 col-sm-4">
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
                                </div>
                                <div onClick={searchSubmit} className="col-12 p-0 col-sm-1 leti-btn">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default FindProduct
