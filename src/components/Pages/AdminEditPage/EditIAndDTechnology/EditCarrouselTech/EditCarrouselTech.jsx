import React, {useState, useEffect} from 'react'

import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {getCarouselTech, updateCarouselTitleTech} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'

function EditCarrouselTech() {

    const [ourGoalsOCData, setOurGoalsOCData] = useState([])
    const [modalData, setModalData] = useState([])
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const {state, onChange} = useFormState(
        {
            data: {
                id: '',
                mainTitle: ourGoalsOCData[0]?.mainTitle,
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
    const [registerError, setRegisterError] = useState(null)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurGoalsOCData(data)
        setBool(!bool)
    }

    const hideModal = (data) => {
        setOurGoalsOCData(data)
        setBool(!bool)
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.mainTitle === false) {
            try {
                await updateCarouselTitleTech(data)
                    .then(info => {
                        setOurGoalsOCData(info)
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
            const getOurGoalsOCData = await getCarouselTech()
            setOurGoalsOCData(getOurGoalsOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(data) => hideModal(data)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)}/>}
            {ourGoalsOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline pt-0">
                <form className="AdminEdit__form" onSubmit={updateInfo}>
                            <div className="row">
                                <h3 className="mt-5">Editar título carrusel</h3>
                                <div className="col-12">
                                    <InputWithLabel
                                        value={data.mainTitle}
                                        label="Título carrusel"
                                        onChange={onChange}
                                        name="mainTitle"
                                        type="text"
                                        cssStyle="form-control mb-5"
                                        placeholder={ourGoalsOCData[0]?.mainTitle}
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
                    <h2>Editar Carousel</h2>
                    <div className="row justify-content-around">
                        {ourGoalsOCData?.map(el =>
                            <div className="col EditCarousel__edit logros" onClick={() => showModal(el)}>
                                <img src={el?.imgURL} alt={el?.name}  />
                                <h4 className="mt-5">{el?.title}</h4>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCarrouselTech
