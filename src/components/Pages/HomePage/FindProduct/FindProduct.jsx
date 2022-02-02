import './FindProduct.css'
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import DropdownWithLabel from '../../../Form/DropdownWithLabel/DropdownWithLabel'
import dataSpecialities from '../../../../data/dataSpecialities'
import {Slide} from 'react-awesome-reveal'
import {getVadevecumData} from '../../../../services/ApiClient'
import {useHistory} from 'react-router'


function FindProduct() {

    const {state, onChange} = useFormState(
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

    const [vadevecum, setVadevecum] = useState([])

    const {data, error, touch} = state

    let history = useHistory()

    const searchSubmit = (event) => {
        event.preventDefault()

        history.push({
            pathname: '/producto',
            state: {
                buscar: data.search,
                especialidad: data.especialidad
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getVadevecumData()
            setVadevecum(data)
        }
        fetchData()

    }, [])


    return (
        <Slide direction="up" triggerOnce>
            <section className="container-fluid FindProduct">
                <div className="container">
                    <div className="row FindProduct__row">
                        <div className="col-12 col-sm-10">
                            <h1>Encuentra un producto</h1>
                            <form className="FindProduct__form">
                                <div className="input-group">
                                    <div className="col-12 p-0 col-sm-7 FindProduct__label">
                                        <DropdownWithLabel
                                            placeholder="Escribe nombre o condición"
                                            value={data.search}
                                            label=""
                                            name="search"
                                            onChange={onChange}
                                            className={`product form-control ${touch.search && error.search ? "is-invalid" : ""}`}
                                            list="searchs"
                                            data={[...new Set(vadevecum.map(v => v.name))].sort()}
                                        />
                                    </div>
                                    <div className="col-12 p-0 col-sm-4">
                                        <DropdownWithLabel
                                            placeholder="Especialidad médica"
                                            value={data.especialidad}
                                            label=""
                                            name="especialidad"
                                            onChange={onChange}
                                            className={`category form-control ${touch.especialidad && error.especialidad ? "is-invalid" : ""}`}
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

        </Slide>
    )
}

export default FindProduct
