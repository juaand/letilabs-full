import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getLetterOurPhilosophy, updateLetterOurPhilosophy} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'

function EditLetterOurPhilosophy() {

    const [letterData, setLetterData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                body: letterData?.body,
                imgURL: letterData?.imgURL,
                mainTitle: letterData?.mainTitle,
            },
            error: {
                body: true,
                imgURL: false,
                mainTitle: false,
            },
            touch: {},
        },
        {
            body: v => v.length,
            imgURL: v => v.length,
            mainTitle: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateLetter = async (event) => {
        event.preventDefault()
        data.id = letterData._id

        try {
            await updateLetterOurPhilosophy(data)
                .then(Letter => {
                    setLetterData(Letter[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleLetterBody = (e) => {
        data.body = e.target.getContent()
    }


    useEffect(() => {
        const fetchData = async () => {
            const getLetterData = await getLetterOurPhilosophy()
            setLetterData(getLetterData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Letter Leti</h2>
            <form className="AdminEdit__form" onSubmit={updateLetter}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={letterData?.body}
                            onChange={handleLetterBody}
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
                            Imagen
                        </p>
                        <InputWithLabel
                            value={data?.imgURL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="imgURL"
                            type="text"
                            cssStyle={`form-control ${touch.imgURL && error.imgURL ? "is-invalid" : ""}`}
                            placeholder={letterData?.imgURL}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            mainTitle
                        </p>
                        <InputWithLabel
                            value={data?.mainTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="mainTitle"
                            type="text"
                            cssStyle={`form-control ${touch.mainTitle && error.mainTitle ? "is-invalid" : ""}`}
                            placeholder={letterData?.mainTitle}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - Letter</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditLetterOurPhilosophy
