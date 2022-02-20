import './EditUnidades.css'
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getUnidades, updateUnidadesData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditUnidades() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                logo: '',
                desc: '',
                url: '',
            },
            error: {
                logo: false,
                desc: false,
                url: false,
            },
            touch: {},
        },
        {
            logo: v => v.length,
            desc: v => v.length,
            url: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [unidadesData, setUnidadesData] = useState()
    const [modalData, setModalData] = useState()
    const [bool, setBool] = useState(false)


    const updateUnidadesInfo = async (event) => {
        event.preventDefault()

        try {
            await updateUnidadesData(data)
                .then(unidades => {
                    setUnidadesData(unidades)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleUnidadesDescription = (e) => {
        data.description = e.target.getContent()
    }

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setUnidadesData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getUnidadesData = await getUnidades()
            setUnidadesData(getUnidadesData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} element={modalData} event deleteItem={(updateData) => deleteItem(updateData)} />}
            <section className="container-fluid EditContent EditContent-timeline">
                <h2>Eliminar unidad de negocio</h2>
                <div className="row justify-content-around">
                    {unidadesData?.map(el =>
                        <div className="col-2 EditCarousel__edit" onClick={() => showModal(el)}>
                            <img className="EditUnidades__img" src={el.logo} alt={el.name} />
                        </div>
                    )}
                </div>
            </section>
            <section className="container-fluid EditContent">
                <h2>Añadir unidad de negocio</h2>
                <form className="AdminEdit__form" onSubmit={updateUnidadesInfo}>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                logo
                            </p>
                            <InputWithLabel
                                value={data?.logo}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="logo"
                                type="text"
                                cssStyle={`form-control ${touch.logo && error.logo ? "is-invalid" : ""}`}
                                placeholder={unidadesData?.logo}
                            />
                            <p className="AdminEdit__form__label">
                                url
                            </p>
                            <InputWithLabel
                                value={data?.url}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="url"
                                type="text"
                                cssStyle={`form-control ${touch.url && error.url ? "is-invalid" : ""}`}
                                placeholder={unidadesData?.url}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                description
                            </p>
                            <Editor
                                initialValue={unidadesData?.desc}
                                onChange={handleUnidadesDescription}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    height: 200,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image',
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount'
                                    ],
                                    toolbar:
                                        'bold',
                                }}
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir unidad de negocio</Button>
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditUnidades
