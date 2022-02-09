import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getBottomOurPhilosophy, updateBottomOurPhilosophy} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditBottomOurPhilosophy() {

    const [bottomOurPhilosophyData, setBottomOurPhilosophyData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: bottomOurPhilosophyData?.title,
                description: bottomOurPhilosophyData?.description,
                buttonLink: bottomOurPhilosophyData?.buttonLink,
                buttonTitle: bottomOurPhilosophyData?.buttonTitle,
                imgURL: bottomOurPhilosophyData?.imgURL,
            },
            error: {
                title: true,
                description: true,
                buttonLink: false,
                buttonTitle: false,
                imgURL: false,
            },
            touch: {},
        },
        {
            dtitle: v => v.length,
            description: v => v.length,
            buttonLink: v => v.length,
            buttonTitle: v => v.length,
            imgURL: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateBottomOurPhilosophy = async (event) => {
        event.preventDefault()
        data.id = bottomOurPhilosophyData._id

        try {
            await updateBottomOurPhilosophy(data)
                .then(BottomOurPhilosophy => {
                    setBottomOurPhilosophyData(BottomOurPhilosophy[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleBottomOurPhilosophyDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {

        const fetchData = async () => {
            const getBottomOurPhilosophyData = await getBottomOurPhilosophy()
            setBottomOurPhilosophyData(getBottomOurPhilosophyData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>BottomOurPhilosophy</h2>
            <form className="AdminEdit__form" onSubmit={updateBottomOurPhilosophy}>
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
                        placeholder={bottomOurPhilosophyData?.title}
                    />
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={bottomOurPhilosophyData?.description}
                            onChange={handleBottomOurPhilosophyDescription}
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
                            placeholder={bottomOurPhilosophyData?.buttonLink}
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
                            placeholder={bottomOurPhilosophyData?.buttonTitle}
                        />
                        <p className="AdminEdit__form__label">
                            Imagen
                        </p>
                        <InputWithLabel
                            value={data?.imgURL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="imgURL"
                            type="text"
                            cssStyle={`form-control ${touch.imgURL && error.imgURL ? "is-invalid" : ""}`}
                            placeholder={bottomOurPhilosophyData?.imgURL}
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

export default EditBottomOurPhilosophy
