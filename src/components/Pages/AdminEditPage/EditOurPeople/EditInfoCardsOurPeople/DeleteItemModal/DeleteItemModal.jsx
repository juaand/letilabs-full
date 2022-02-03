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
                                            <img src={"./images/" + seoURL(data.imgURL) + ".svg"} alt={data.imgURL} />
                                        </div>
                                        <div className="col-12">
                                        <p className="DeleteItemModal__text"><strong>título principal</strong> {data.mainTitle}</p>
                                            <p className="DeleteItemModal__text"><strong>unidad</strong> {data.title}</p>
                                            <p className="DeleteItemModal__text"><strong>info</strong> {data.info}</p>
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
