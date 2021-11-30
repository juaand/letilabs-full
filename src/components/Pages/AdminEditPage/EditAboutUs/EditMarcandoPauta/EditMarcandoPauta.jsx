import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getMarcandoPauta, updateMarcandoPautaData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'

function EditMarcandoPauta() {

    const [marcandoPautaData, setMarcandoPautaData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                description: marcandoPautaData?.description,
                imgURL: marcandoPautaData?.imgURL,
            },
            error: {
                description: true,
                imgURL: false,
            },
            touch: {},
        },
        {
            description: v => v.length,
            imgURL: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateMarcandoPauta = async (event) => {
        event.preventDefault()
        data.id = marcandoPautaData._id

        try {
            await updateMarcandoPautaData(data)
                .then(marcandopauta => {
                    setMarcandoPautaData(marcandopauta[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleMarcandoPautaDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {
        const fetchData = async () => {
            const getMarcandoPautaData = await getMarcandoPauta()
            setMarcandoPautaData(getMarcandoPautaData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Marcando pauta</h2>
            <form className="AdminEdit__form" onSubmit={updateMarcandoPauta}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            onChange={handleMarcandoPautaDescription}
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
                                placeholder: marcandoPautaData?.description
                            }}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
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
                            placeholder={marcandoPautaData?.imgURL}
                        />
                    </div>
                    <div className="col-12">
                        <Button className="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - Banner</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditMarcandoPauta
