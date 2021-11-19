import './UsInfo.css'
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {createContent, getUsInfo, updateUsInfoData} from '../../../../../services/ApiClient'
import {useAuthContext} from '../../../../../contexts/AuthContext'
import {Link} from 'react-router-dom'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function UsInfo() {

    const [usInfoData, setUsInfoData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                description: usInfoData?.description,
                url: usInfoData?.url,
                buttonTitle: usInfoData?.buttonTitle,
            },
            error: {
                description: true,
                url: true,
                buttonTitle: true,
            },
            touch: {},
        },
        {
            description: v => v.length,
            url: v => v.length,
            buttonTitle: v => v.length,
        }
    )

    const {data, error, touch} = state



    const [registerError, setRegisterError] = useState(null)


    const updateUsInfo = async (event) => {
        event.preventDefault()
        data.id = usInfoData._id
        console.log(data)
        try {
            await updateUsInfoData(data)
                .then(usInfo => {
                    setUsInfoData(usInfo[0])
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleUsInfoDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {
            const fetchData = async () => {
                const getUsInfoData = await getUsInfo()
                setUsInfoData(getUsInfoData)
                
            }
            fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container Nosotros">
            <div className="row">
                <div className="col-11 col-sm-6">
                <form onSubmit={updateUsInfo}>
                    <p className="Nosotros__valor">
                        Description:
                        <Editor
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image',
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount'
                                    ],
                                    toolbar:
                                        'bold',
                                    placeholder:usInfoData?.description
                                }}
                                
                                onChange={handleUsInfoDescription}
                            />    
                    </p>
                    <p className="Nosotros__valor">
                        URL del botón:
                    <InputWithLabel 
                        value={data?.url}
                        onBlur={onBlur}
                        onChange={onChange}
                        name="url"
                        type="text"
                        className={`form-control ${touch.url && error.url ? "is-invalid" : ""}`}
                        placeholder={usInfoData?.url}
                                                    />
                        
                    </p>
                    <p className="Nosotros__valor">
                        Título del botón:
                    <InputWithLabel 
                        value={data?.buttonTitle}
                        onBlur={onBlur}
                        onChange={onChange}
                        name="buttonTitle"
                        type="text"
                        className={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                        placeholder={usInfoData?.buttonTitle}
                                                    />
                        
                    </p>
                    <Button className="button __yellow-btn" >Editar Sobre Nosotros</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UsInfo
