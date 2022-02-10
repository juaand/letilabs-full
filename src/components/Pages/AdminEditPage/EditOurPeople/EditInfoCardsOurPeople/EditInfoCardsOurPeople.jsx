import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getInfoCardsOurPeople} from '../../../../../services/ApiClient'
import {app} from '../../../../../services/firebase'
import InputFile from '../../../../Form/InputFile/InputFile'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditInfoCardsOurPeople() {
    const [modalData, setModalData] = useState()
    const [ourOCData, setOurOCData] = useState()
    const [bool, setBool] = useState(false)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                mainTitle: ourOCData?.mainTitle,
                imgURL: ourOCData?.imgURL,
            },
            error: {
                title: true,
                imgURL: false,
            },
            touch: {},
        },
        {
            title: v => v.length,
            imgURL: v => v.length,
        }
    )



    const {data, error, touch} = state

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setOurOCData(info)
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
                //Se habilita el botón para subir el blog
                console.log('Uploaded')
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.imgURL = fileUrl
    }

    const updateICOurPeople = () => {
        console.log(data)
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
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar InfoCard</h2>
                    <form className="AdminEdit__form" onSubmit={updateICOurPeople}>
                        <div className="row justify-content-around">
                            <div className="col-12 col-sm-6">
                                <p className="AdminEdit__form__label">
                                    Título
                                </p>
                                <InputWithLabel
                                    value={data?.mainTitle}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="title"
                                    type="text"
                                    cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                                    placeholder={ourOCData[0]?.mainTitle}
                                />
                            </div>
                            <div className="col-12 col-sm-6">
                                <p className="AdminEdit__form__label">
                                    Imagen
                                </p>
                                <InputFile
                                    value={data?.imgURL}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="picpath"
                                    type="file"
                                    placeholder={data?.imgURL}
                                />
                            </div>
                        </div>
                        <div className="row justify-content-around">
                            {ourOCData?.map(el =>
                                <div className="col-3 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                    <h4 className="mt-3 mb-3">{el?.title}</h4>
                                    <p>{el?.info}</p>
                                </div>
                            )}
                        </div>
                    </form>
                </section>}
        </>
    )
}

export default EditInfoCardsOurPeople
