import './DeleteItemModal.css'
import React from 'react'
import {deleteCarItem} from '../../../../../../services/ApiClient'

function DeleteItemModal({deleteItem, data, hideModal}) {

    const deleteCarrouselItem = async (id) => {
        const updateData = await deleteCarItem(id)
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
                                        <div className="col-12 col-sm-2 DeleteItemModal__img">
                                            <img src={"./images/" + data.img + ".png"} alt={data.name} />
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <p className="DeleteItemModal__text"><strong>producto</strong> {data.name}</p>
                                            <p className="DeleteItemModal__text"><strong>descripción</strong> {data.desc}</p>
                                        </div>
                                        <div className="col-12 col-sm-3">
                                            <div onClick={() => deleteCarrouselItem(data._id)} className="leti-btn">Eliminar</div>
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
