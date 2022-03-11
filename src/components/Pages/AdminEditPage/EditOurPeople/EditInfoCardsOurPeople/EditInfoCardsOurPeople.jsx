import React, {useState, useEffect} from 'react'

import {getInfoCardsOurPeople, createTeam, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'

function EditInfoCardsOurPeople() {

    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [ourOCData, setOurOCData] = useState()
    const [newTeamMessage, setNewTeamMessage] = useState('')
    const [bool, setBool] = useState(false)
    

    const {state, onChange} = useFormState(
        {
            data: {
                id: '',
                info: ourOCData?.info,
                title: ourOCData?.title,
            },
            error: {
                info: true,
                title: true,
            },
            touch: {},
        },
        {
            info: v => v.length,
            title: v => v.length,
        }
    )

    const {data, error, touch} = state

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setOurOCData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setOurOCData(info)
        setBool(!bool)
    }

    const contentData = {
        content: data?.info,
        url: '/nuestra-gente',
        name: 'Nuestra gente',
        type: `Nuestra gente - ${data?.title}`,
    }

    const createNewTeam = async (event) => {
        event.preventDefault()
        data.id = ourOCData[0]?._id

        if (contentData.content.length > 0) {
            createContent(contentData)
        }

        if (error.title === false && error.info === false) {
            try {
                await createTeam(data)
                    .then(equipo => {
                        setOurOCData(equipo)
                        setNewTeamMessage('Data creada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setNewTeamMessage('Por favor rellene ambos campos')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurOCData = await getInfoCardsOurPeople()
            setOurOCData(getOurOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {ourOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline pt-0">
                    <h2>Equipos</h2>
                    <div className="row justify-content-around mt-5">
                        <h3 className="mb-5">Editar equipos</h3>
                        {ourOCData?.map(el =>
                            <div className="col-sm-3 col-12 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                <h4 className="mt-3 mb-3">{el?.title}</h4>
                                <p dangerouslySetInnerHTML={{__html: el?.info}} />
                            </div>
                        )}
                    </div>
                    <hr className="mt-5" />
                    <div className="row justify-content-around mt-5">
                        <h3 className="mb-5">Añadir nuevo equipo</h3>
                        <div className="col-12">
                            <form className="AdminEdit__form" onSubmit={createNewTeam}>
                                <div className="row">
                                    <div className="col-sm-6 col-12">
                                        <InputWithLabel
                                            label="Título equipo"
                                            onChange={onChange}
                                            name="title"
                                            type="text"
                                            cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                                            placeholder="Ingrese título del equipo"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <InputWithLabel
                                            label="Info equipo"
                                            onChange={onChange}
                                            name="info"
                                            type="text"
                                            cssStyle={`form-control ${touch.info && error.info ? "is-invalid" : ""}`}
                                            placeholder="Ingrese info del equipo"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <Button type="submit" cssStyle="leti-btn">Crear nuevo equipo</Button>
                                        {newTeamMessage && <span className="AdminEdit__message">{newTeamMessage}</span>}
                                    </div>

                                </div>
                                {registerError && <div className="alert alert-danger">{registerError}</div>}
                            </form>
                        </div>
                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </section>
            }
        </>
    )
}

export default EditInfoCardsOurPeople
