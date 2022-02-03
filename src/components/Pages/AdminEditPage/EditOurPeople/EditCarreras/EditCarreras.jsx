import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getCarreras, updateCarrerasData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditCarreras() {

    const [carrerasData, setCarrerasData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: carrerasData?.title,
                description: carrerasData?.description,
                buttonLink: carrerasData?.buttonLink,
                buttonTitle: carrerasData?.buttonTitle,
            },
            error: {
                title: true,
                description: true,
                buttonLink: false,
                buttonTitle: false,
            },
            touch: {},
        },
        {
            dtitle: v => v.length,
            description: v => v.length,
            buttonLink: v => v.length,
            buttonTitle: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateCarreras = async (event) => {
        event.preventDefault()
        data.id = carrerasData._id

        try {
            await updateCarrerasData(data)
                .then(carreras => {
                    setCarrerasData(carreras[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleCarrerasDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {

        const fetchData = async () => {
            const getCarrerasData = await getCarreras()
            setCarrerasData(getCarrerasData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Carreras</h2>
            <form className="AdminEdit__form" onSubmit={updateCarreras}>
                <div className="row">
                    <p className="AdminEdit__form__label">
                        Título
                    </p>
                    <InputWithLabel
                        value={data?.title}
                        onBlur={onBlur}
                        onChange={onChange}
                        name="title"
                        type="text"
                        cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                        placeholder={carrerasData?.title}
                    />
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={carrerasData?.description}
                            onChange={handleCarrerasDescription}
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
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            buttonLink del botón
                        </p>
                        <InputWithLabel
                            value={data?.buttonLink}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonLink"
                            type="text"
                            cssStyle={`form-control ${touch.buttonLink && error.buttonLink ? "is-invalid" : ""}`}
                            placeholder={carrerasData?.buttonLink}
                        />
                        <p className="AdminEdit__form__label">
                            Título del botón
                        </p>
                        <InputWithLabel
                            value={data?.buttonTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonTitle"
                            type="text"
                            cssStyle={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                            placeholder={carrerasData?.buttonTitle}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - MegatY mejor!
                        </Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditCarreras
