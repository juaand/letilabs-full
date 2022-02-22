import './DeleteItemModal.css'
import React from 'react'
import {deleteUnitItem} from '../../../../../../services/ApiClient'
import {seoURL} from '../../../../../../hooks/seoURL'

function DeleteItemModal({deleteItem, data, hideModal}) {

    const deleteUnidadItem = async (id) => {
        const updateData = await deleteUnitItem(id)
        deleteItem(updateData)
    }

    return (
        <div className="DeleteItemModal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-5 DeleteItemModal__container">
                        <span className="DeleteItemModal__close" onClick={hideModal}></span>
                        <div className="col-sm-12">
                            <p className="DeleteItemModal__ask">¿Quieres eliminar el siguiente producto?</p>
                            <div className="card">
                                <div className="card-body DeleteItemModal__body">
                                    <div className="row align-items-center">
                                        <div className="col-12 DeleteItemModal__img-small">
                                            <img src={"./images/" + seoURL(data.name) + ".svg"} onerror="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={data.name} />
                                        </div>
                                        <div className="col-12">
                                            <p className="DeleteItemModal__text"><strong>unidad</strong> {data.name}</p>
                                            <p className="DeleteItemModal__text"><strong>descripción</strong> {data.desc}</p>
                                        </div>
                                        <div className="col-12">
                                            <div onClick={() => deleteUnidadItem(data._id)} className="leti-btn small">Eliminar</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeleteItemModal
