import './ShowEditModal.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../hooks/useFormState'
import InputFile from '../../../Form/InputFile/InputFile'
import {app} from '../../../../services/firebase'
import {Editor} from '@tinymce/tinymce-react'
import Button from '../../../Form/FormButton/FormButton'
import {deleteProduct, updateProduct} from '../../../../services/ApiClient'

function ShowEditModal({product, hideModal, updateData}) {

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
        }
    )

    const {data} = state

    const handleComposition = (e) => {
        data.composition = e.target.getContent()
    }

    const handleActivePrinciple = (e) => {
        data.active_principle = e.target.getContent()
    }

    const handlePosology = (e) => {
        data.posology = e.target.getContent()
    }

    const handlePresentation = (e) => {
        data.presentation = e.target.getContent()
    }

    const updateThisProduct = async (event) => {
        event.preventDefault()
        data.id = product._id

        const updatedProductsData = await updateProduct(data)
        updateData(updatedProductsData)
    }

    const deleteSelectedProduct = async (id) => {
        const updatedProductsData = await deleteProduct(id)
        updateData(updatedProductsData)
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
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data[e.target.name] = fileUrl
    }


    return (

        <main className="modal ShowEditModal">
            <div className="container">
                <div className="row justify-content-center">
                    <Fade direction="down" className="col-11 ShowEditModal__container">
                        <>
                            <span className="ShowEditModal__close" onClick={hideModal}></span>
                            <form className="AdminEdit__form" onSubmit={updateThisProduct}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <p className="DeleteItemModal__ask">Editar {product.name}</p>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <InputWithLabel
                                            label="Nombre"
                                            value={data?.name}
                                            onChange={onChange}
                                            name="name"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <InputWithLabel
                                            label="Línea"
                                            value={data?.line}
                                            onChange={onChange}
                                            name="line"
                                            type="text"
                                            className="form-control"
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
                                            className="form-control"
                                            placeholder="Registro sanitario"
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <InputFile
                                            label="Imagen producto"
                                            value={data?.picPath}
                                            onChange={onFileSelected}
                                            id="fileButton"
                                            name="picPath"
                                            type="file"
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <InputFile
                                            label="QR producto"
                                            value={data?.QRpath}
                                            onChange={onFileSelected}
                                            id="fileButton"
                                            name="QRpath"
                                            type="file"
                                        />
                                    </div>
                                    <div className="col-12 col-sm-3">
                                        <p className="label"><strong>Composición</strong></p>
                                        <Editor
                                            initialValue={data?.composition}
                                            onChange={handleComposition}
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
                                    <div className="col-12 col-sm-3">
                                        <p className="label"><strong>Principio activo</strong></p>
                                        <Editor
                                            initialValue={data?.active_principle}
                                            onChange={handleActivePrinciple}
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
                                    <div className="col-12 col-sm-3">
                                        <p className="label"><strong>Posología</strong></p>
                                        <Editor
                                            initialValue={data?.posology}
                                            onChange={handlePosology}
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
                                    <div className="col-12 col-sm-3">
                                        <p className="label"><strong>Presentación</strong></p>
                                        <Editor
                                            initialValue={data?.presentation}
                                            onChange={handlePresentation}
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
                                    <div className="col-12 col-sm-6 mt-5">
                                        <div onClick={() => deleteSelectedProduct(product?._id)} className="leti-btn delete">Eliminar producto</div>
                                    </div>
                                    <div className="col-12 col-sm-6 mt-5 d-flex justify-content-end">
                                        <Button type="submit" className="leti-btn">Guardar cambios</Button>
                                    </div>
                                </div>
                            </form>
                        </>
                    </Fade>
                </div>
            </div>
        </main>

    )
}

export default ShowEditModal
