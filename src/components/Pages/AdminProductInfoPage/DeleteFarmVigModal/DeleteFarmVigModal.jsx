import './DeleteFarmVigModal.css'
import React from 'react'
import {deleteProductInfoCard} from '../../../../services/ApiClient'

function DeleteFarmVigModal({card, hideModal, data}) {

    const deleteCard = async (cardId) => {
        const updatedData = await deleteProductInfoCard(cardId)
        hideModal(updatedData)
        data()
    }

    return (
        <div className="DeleteFarmVigModal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-5 DeleteFarmVigModal__container">
                        <span className="DeleteFarmVigModal__close" onClick={hideModal}></span>
                        <div className="col-sm-12">
                            <p className="DeleteFarmVigModal__ask">¿Quieres eliminar el siguiente comentario?</p>
                            <div className="card mb-5" key={card.name}>
                                <div className="card-body">
                                    <span className="AdminProductInfoPage__date">{new Date(card.createdAt).getDate()} / {new Date(card.createdAt).getMonth()} / {new Date(card.createdAt).getFullYear()}
                                    </span>
                                    <p className="AdminProductInfoPage__medicine">Dr/a. {card.name} {card.lastname}</p>
                                    <div className="AdminProductInfoPage__info">
                                        <p className="AdminProductInfoPage__datainfo">
                                            <strong>Institución</strong> {card.work}</p>
                                        <p className="AdminProductInfoPage__datainfo">
                                            <strong>Especialidad</strong> {card.speciality}</p>
                                        <p className="AdminProductInfoPage__datainfo">
                                            <strong>Años de servicio</strong> {card.years}</p>
                                        <p className="AdminProductInfoPage__datainfo">
                                            <strong>Licencia</strong> {card.license}</p>
                                    </div>
                                    <a href={`mailto:${card.mail}`} className="AdminProductInfoPage__patient-email">
                                        {(card.mail).toLocaleLowerCase()}
                                    </a>
                                    <p className="AdminProductInfoPage__desc">Desea la siguiente información</p>
                                    <p className="AdminProductInfoPage__effects">{card.info}</p>
                                </div>
                            </div>
                            <span onClick={() => deleteCard(card.id)} className="leti-btn">Eliminar</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeleteFarmVigModal
