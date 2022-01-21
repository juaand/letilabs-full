import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getTimeLineGenven, addTimeLineGenvenData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from '../../EditHome/EditCarousel/DeleteItemModal/DeleteItemModal'

function EditTimelineGenven() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                imgURL: '',
                desc: '',
                buttonTitle: '',
                buttonLink: '',
            },
            error: {
                imgURL: false,
                desc: false,
                buttonTitle: false,
                buttonLink: false,
            },
            touch: {},
        },
        {
            imgURL: v => v.length,
            desc: v => v.length,
            buttonTitle: v => v.length,
            buttonLink: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [timelineData, setTimeLineData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const addTimeLineItem = async (event) => {
        event.preventDefault()

        try {
            await addTimeLineGenvenData(data)
                .then(timeline => {
                    setTimeLineData(timeline)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const deleteItem = (data) => {
        setTimeLineData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getTimeLineData = await getTimeLineGenven()
            setTimeLineData(getTimeLineData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {timelineData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Elminar elemento del TimeLine</h2>
                    <div className="row justify-content-around">
                        {timelineData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el?.imgURL} alt={el?.imgURL} />
                                <p>{el?.desc}</p>
                                <p>{el?.buttonTitle}</p>
                                <p>{el?.buttonLink}</p>
                            </div>
                        )}
                    </div>
                </section>}
                {console.log(timelineData)}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo elemento al timeline</h2>
                <form className="AdminEdit__form" onSubmit={addTimeLineItem}>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputWithLabel
                                value={data?.imgURL}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="imgURL"
                                type="text"
                                className={`form-control ${touch.imgURL && error.imgURL ? "is-invalid" : ""}`}
                                placeholder=""
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <InputWithLabel
                                value={data?.desc}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="desc"
                                type="text"
                                className={`form-control ${touch.desc && error.desc ? "is-invalid" : ""}`}
                                placeholder="Ingresa descripción"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Título botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonTitle"
                                type="text"
                                className={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                                placeholder="Ingresa Título botón"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Url Botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonLink}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonLink"
                                type="text"
                                className={`form-control ${touch.buttonLink && error.buttonLink ? "is-invalid" : ""}`}
                                placeholder="Ingresa Url Botón"
                            />
                        </div>
                        <div className="col-12">
                            <Button className="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo elemento</Button>
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditTimelineGenven
