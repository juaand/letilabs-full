import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getTimeLine, addTimeLineData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from '../../EditHome/EditCarousel/DeleteItemModal/DeleteItemModal'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'

function EditTimeline() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                year: '',
                imgURL: '',
                desc: '',
            },
            error: {
                year: false,
                imgURL: false,
                desc: false,
            },
            touch: {},
        },
        {
            year: v => v.length,
            imgURL: v => v.length,
            desc: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [timelineData, setTimeLineData] = useState()
    const [bool, setBool] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const addTimeLineItem = async (event) => {
        event.preventDefault()

        try {
            await addTimeLineData(data)
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

    const onFileSelected = async (e) => {
        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('images/' + file.name)

        // Upload file
        await filePath.put(file)
            .then(() => {
                console.log('Uploaded')
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.imgURL = fileUrl
        console.log(fileUrl)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getTimeLineData = await getTimeLine()
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
                    <h2>Editar elemento del TimeLine</h2>
                    <div className="row justify-content-around">
                        {timelineData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={"./images/" + el.imgURL} alt={el.year} />
                                <p>{el.year}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo producto al timeline</h2>
                <form className="AdminEdit__form" onSubmit={addTimeLineItem}>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Año
                            </p>
                            <InputWithLabel
                                value={data?.year}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="year"
                                type="text"
                                className={`form-control ${touch.year && error.year ? "is-invalid" : ""}`}
                                placeholder="Ingresa año"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                                className="form-control"
                                placeholder="Selecciona una imagen"
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
                        <div className="col-12">
                            <Button className="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo año</Button>
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditTimeline
