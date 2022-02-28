import './DeleteFarmVigModal.css'
import React from 'react'

import {deleteLeadsCard} from '../../../../services/ApiClient'

function DeleteFarmVigModal({card, hideModal, closeModal}) {

    const deleteCard = async (cardId) => {
        const updatedData = await deleteLeadsCard(cardId)
        hideModal(updatedData)
    }

    return (
        <div className="DeleteFarmVigModal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-5 DeleteFarmVigModal__container">
                        <span className="DeleteFarmVigModal__close" onClick={closeModal}></span>
                        <div className="col-sm-12">
                            <p className="DeleteFarmVigModal__ask">¿Quieres eliminar el siguiente comentario?</p>
                            <div className="card mb-5" key={card.name}>
                                <div className="card-body">
                                    <span className="AdminProductInfoPage__date">{new Date(card.createdAt).getDate()} / {new Date(card.createdAt).getMonth()} / {new Date(card.createdAt).getFullYear()}
                                    </span>
                                    <p className="AdminProductInfoPage__medicine">Dr/a. {card.name} {card.lastname}</p>
                                    <div className="AdminLeadsPage__info mt-0 ">
                                        <p className="AdminLeadsPage__datainfo">
                                            <strong>Teléfono</strong> {card.phone}</p>
                                        <p className="AdminLeadsPage__datainfo">
                                            <strong>País</strong> {card.country}</p>
                                        <p className="AdminLeadsPage__datainfo">
                                            <strong>Compañía</strong> {card.company}</p>
                                    </div>
                                    <a href={`mailto:${card.mail}`} className="AdminProductInfoPage__patient-email">
                                        {(card.mail).toLocaleLowerCase()}
                                    </a>
                                    <p className="AdminProductInfoPage__desc">Desea la siguiente información</p>
                                    <p className="AdminProductInfoPage__effects">{card.message}</p>
                                </div>
                            </div>
                            <span onClick={() => deleteCard(card.id)} className="col-sm-6 col-12 leti-btn delete">Eliminar</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeleteFarmVigModal
