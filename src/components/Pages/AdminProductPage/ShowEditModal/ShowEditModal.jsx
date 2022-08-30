import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Fade} from 'react-awesome-reveal'

import {deleteProduct, updateProduct} from '../../../../services/ApiClient'
import {useFormState} from '../../../../hooks/useFormState'
import {app} from '../../../../services/firebase'

import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../../Form/InputFile/InputFile'
import Button from '../../../Form/FormButton/FormButton'
import Loader from '../../../Loader/Loader'

import './ShowEditModal.css'

function ShowEditModal({product, hideModal, updateData}) {

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)

    const [message, setMessage] = useState('')
    const [fileSizeMessage, setFileSizeMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                name: product.name,
                picPath: product.picPath,
                QRpath: product.QRpath,
                line: product.line,
                composition: product.composition,
                health_register: product.health_register,
                active_principle: product.active_principle,
                posology: product.posology,
                presentation: product.presentation,
                indication: product.indication,
                therapeutic_group: product.therapeutic_group,
                category: product.category,
            },
            error: {
                name: true,
                picPath: true,
                QRpath: true,
                line: true,
                composition: true,
                health_register: true,
                active_principle: true,
                posology: true,
                presentation: true,
                indication: true,
                therapeutic_group: true,
                category: true,
            },
            touch: {},
        },
        {
            name: v => v.length,
            picPath: v => v.length,
            QRpath: v => v.length,
            line: v => v.length,
            composition: v => v.length,
            health_register: v => v.length,
            active_principle: v => v.length,
            posology: v => v.length,
            presentation: v => v.length,
            indication: v => v.length,
            therapeutic_group: v => v.length,
            category: v => v.length,
        }
    )

    const {data, error} = state

    const handleChange = (e) => {
        data[e.target.settings.name] = e.target.getContent()
        error[e.target.settings.name] = false
    }

    const updateThisProduct = async (event) => {
        event.preventDefault()
        data.id = product._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                if (error.therapeutic_group === false) {
                    const setCategories = data.therapeutic_group.split(',')
                    data.therapeutic_group = setCategories
                }
                await updateProduct(data)
                    .then((info) => {
                        updateData(info)
                        setMessage('Data atualizada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite alguno de los campos')
        }
    }

    const deleteSelectedProduct = async (id) => {
        const updatedProductsData = await deleteProduct(id)
        updateData(updatedProductsData)
    }

    const onFileSelected = async (e) => {
        // Get file
        const file = e.target.files[0]

        if (file.size > 500000) {
            setFileSizeMessage("El tamaño de la imagen excede el máximo permitido (500KB), por favor optimícela y vuelva a intentar")
        } else {
            setIsDisabled(!isDisabled)
            setFileSizeMessage('')

            // Create storage ref
            const storageRef = app.storage().ref()
            const filePath = storageRef.child('images/' + file.name)
    
            // Upload file
            await filePath.put(file)
                .then(() => {
                    // console.log('Uploaded')
                })
                .catch(err => {setMessage(err)})
    
            // Get file url
            const fileUrl = await filePath.getDownloadURL()
            data[e.target.name] = fileUrl
            setIsDisabled(false)
            error[e.target.name] = false
        }

    }


    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <main className="modal ShowEditModal">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <Fade direction="down" className="col-11 ShowEditModal__container product-modal">
                            <>
                                <span className="ShowEditModal__close big" onClick={hideModal}></span>
                                <form className="AdminEdit__form" onSubmit={updateThisProduct}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h1 className="DeleteItemModal__ask">Editar {product.name}</h1>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <InputWithLabel
                                                label="Nombre"
                                                value={data?.name}
                                                onChange={onChange}
                                                name="name"
                                                type="text"
                                                cssStyle="form-control"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <InputWithLabel
                                                label="Línea"
                                                value={data?.line}
                                                onChange={onChange}
                                                name="line"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder="Ingresa línea del producto"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <InputWithLabel
                                                label="Registro sanitario"
                                                value={data?.health_register}
                                                onChange={onChange}
                                                name="health_register"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder="Registro sanitario"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <InputFile
                                                label="Imagen producto"
                                                value={data?.picPath}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="picPath"
                                                type="file"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <InputFile
                                                label="QR producto"
                                                value={data?.QRpath}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="QRpath"
                                                type="file"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <InputWithLabel
                                                label="Áreas terapéuticas / Separadas por comas"
                                                value={data?.therapeutic_group}
                                                onChange={onChange}
                                                name="therapeutic_group"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder="Áreas terapéuticas / Separadas por comas"
                                            />
                                        </div>
                                        {fileSizeMessage && 
                                            <div className="col-12">
                                                <small>{fileSizeMessage}</small>
                                            </div>
                                        }
                                        <div className="row">
                                            <div className="col-12 col-sm-4">
                                                <p className="label"><strong>Composición</strong></p>
                                                <Editor
                                                    initialValue={data?.composition}
                                                    onChange={handleChange}
                                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                    init={{
                                                        name: 'composition',
                                                        height: 140,
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
                                            <div className="col-12 col-sm-4">
                                                <p className="label"><strong>Principio activo</strong></p>
                                                <Editor
                                                    initialValue={data?.active_principle}
                                                    onChange={handleChange}
                                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                    init={{
                                                        name: 'active_principle',
                                                        height: 140,
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
                                            <div className="col-12 col-sm-4">
                                                <p className="label"><strong>Posología</strong></p>
                                                <Editor
                                                    initialValue={data?.posology}
                                                    onChange={handleChange}
                                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                    init={{
                                                        name: 'posology',
                                                        height: 140,
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
                                                <p className="label"><strong>Presentación</strong></p>
                                                <Editor
                                                    initialValue={data?.presentation}
                                                    onChange={handleChange}
                                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                    init={{
                                                        name: 'presentation',
                                                        height: 140,
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
                                                <p className="label"><strong>Indicaciones</strong></p>
                                                <Editor
                                                    initialValue={data?.indication}
                                                    onChange={handleChange}
                                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                    init={{
                                                        name: 'indication',
                                                        height: 140,
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
                                        </div>
                                        <div className="col-12 col-sm-6 mt-5">
                                            <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                            {message && <span className="AdminEdit__message">{message}</span>}
                                        </div>
                                        <div className="col-12 col-sm-6 mt-5 d-flex justify-content-end">
                                            <div onClick={() => deleteSelectedProduct(product?._id)} className="leti-btn delete">Eliminar producto</div>
                                        </div>
                                        <div className="col-12 col-sm-6 mt-5">
                                            {registerError && <div className="alert alert-danger">{registerError}</div>}
                                        </div>
                                    </div>
                                </form>
                            </>
                        </Fade>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShowEditModal