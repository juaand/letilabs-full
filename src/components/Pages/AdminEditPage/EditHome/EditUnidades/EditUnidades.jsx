import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {useFormState} from '../../../../../hooks/useFormState'
import {getUnidades, updateTitleUnidadesNegocio} from '../../../../../services/ApiClient'

import DeleteItemModal from './DeleteItemModal/DeleteItemModal'
import Button from '../../../../Form/FormButton/FormButton'

import './EditUnidades.css'

function EditUnidades() {

    const [unidadesData, setUnidadesData] = useState([])
    const [modalData, setModalData] = useState([])

    const [titleData, setTitleData] = useState('')
    const [message, setMessage] = useState('')

    const [registerError, setRegisterError] = useState(null)
    const [bool, setBool] = useState(false)

    const {state} = useFormState(
        {
            data: {
                id: '',
                mainTitle: unidadesData?.mainTitle,
            },
            error: {
                mainTitle: true,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
        }
    )

    const {data, error} = state

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setUnidadesData(data)
        setBool(!bool)
    }

    const handleChange = (e) => {
        data[e.target.settings.name] = e.target.getContent()
        error[e.target.settings.name] = false
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.mainTitle === false) {
            try {
                await updateTitleUnidadesNegocio(data)
                    .then(info => {
                        setTitleData(info)
                        setMessage('Título atualizado exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el título')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getUnidadesData = await getUnidades()
            setUnidadesData(getUnidadesData)
            setTitleData(getUnidadesData[0]?.mainTitle)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} element={modalData} event deleteItem={(updateData) => deleteItem(updateData)} />}
            {unidadesData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline pt-5">
                    <h2>Editar unidad de negocio</h2>
                    <form className="AdminEdit__form" onSubmit={updateInfo}>
                        <div className="row">
                            <h3>Editar título portafolio</h3>
                            <div className="col-12">
                                <Editor
                                    initialValue={titleData}
                                    onChange={handleChange}
                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                    init={{
                                        name: 'mainTitle',
                                        height: 140,
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
                            <div className="col-12 col-sm-6">
                                <Button type="submit" cssStyle="leti-btn">Editar título</Button>
                                {message && <span className="AdminEdit__message ">{message}</span>}
                            </div>
                        </div>
                        <hr className="mt-5 mb-5" />
                        {registerError && <div className="alert alert-danger">{registerError}</div>}
                    </form>
                    <div className="row justify-content-around">
                        <h3 className="mb-5">Editar unidades de negocio</h3>
                        {unidadesData?.map(el =>
                            <div className="col-sm-2 col-12 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditUnidades__img" src={el.logo} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el.name} />
                            </div>
                        )}
                    </div>
                </section>
            }
        </>
    )
}

export default EditUnidades
