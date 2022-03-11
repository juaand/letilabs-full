import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getCookieInfo, updateCookieInfo} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'

function EditCookies() {

    const [cookieData, setCookieData] = useState()
    const [message, setMessage] = useState('')

    const {state} = useFormState(
        {
            data: {
                id: cookieData?._id,
                info: cookieData?.info,
            },
            error: {
                info: true,
            },
            touch: {},
        },
        {
            info: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)


    const updateFarmaco = async (event) => {
        event.preventDefault()
        data.id = cookieData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateCookieInfo(data)
                    .then(cookie => {
                        setCookieData(cookie)
                        setMessage('Data atualizada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite la información')
        }
    }

    const handleDescription = (e) => {
        data.info = e.target.getContent()
        error.info = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getCookieData = await getCookieInfo()
            setCookieData(getCookieData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid EditContent EditContent__active">
            <h2>Política de cookies</h2>
            <form className="AdminEdit__form" onSubmit={updateFarmaco}>
                <div className="row">
                    <div className="col-12">
                        <p className="AdminEdit__form__label">
                            Info
                        </p>
                        <Editor
                            initialValue={cookieData?.info}
                            onChange={handleDescription}
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
                        /></div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios</Button>
                        {message && <span className="AdminEdit__message">{message}</span>}
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditCookies
