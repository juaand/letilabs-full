import './FindProduct.css'
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import DropdownWithLabel from '../../../Form/DropdownWithLabel/DropdownWithLabel'
import dataSpecialities from '../../../../data/dataSpecialities'
import {Slide} from 'react-awesome-reveal'
import {useHistory} from 'react-router'
import {getVadevecumData} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function FindProduct({info}) {

    const [vadevecum, setVadevecum] = useState([])
    const [loading, setLoading] = useState(true)

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

    const {data, error, touch} = state

    let history = useHistory()

    const searchSubmit = (event) => {
        event.preventDefault()

        history.push({
            pathname: '/producto',
            state: {
                buscar: data?.search,
                especialidad: data?.especialidad
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const getData = await getVadevecumData()
            setVadevecum(getData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <Slide direction="up" triggerOnce>
                <section className="container-fluid FindProduct no-back">
                    <div className="container">
                        <div className="row FindProduct__row">
                            <div className="col-12">
                                <h1 dangerouslySetInnerHTML={{__html: info?.findProductsTitle}}></h1>
                                <form className="FindProduct__form">
                                    <div className="input-group">
                                        <div className="col-12 p-0 col-sm-7 FindProduct__label">
                                            <DropdownWithLabel
                                                placeholder="Buscar por producto"
                                                value={data?.search}
                                                label=""
                                                name="search"
                                                onChange={onChange}
                                                cssStyle={`product form-control ${touch?.search && error?.search ? "is-invalid" : ""}`}
                                                list="searchs"
                                                data={[...new Set(vadevecum?.map(v => v.name))].sort()}
                                            />
                                        </div>
                                        <div className="col-12 p-0 col-sm-4">
                                            <DropdownWithLabel
                                                placeholder="Especialidad médica"
                                                value={data?.especialidad}
                                                label=""
                                                name="especialidad"
                                                onChange={onChange}
                                                cssStyle={`category form-control ${touch?.especialidad && error?.especialidad ? "is-invalid" : ""}`}
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
        </>
    )
}

export default FindProduct
