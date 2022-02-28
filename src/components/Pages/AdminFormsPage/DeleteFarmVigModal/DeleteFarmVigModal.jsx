import './DeleteFarmVigModal.css'
import React from 'react'
import {dropVigCard} from '../../../../services/ApiClient'

function DeleteFarmVigModal({card, hideModal, data}) {

    const getSex = (str) => {
        if (str === 'F') {
            return 'femenino'
        } else {
            return 'masculino'
        }
    }

    const getPrescribed = (str) => {
        if (str === 'No') {
            return 'no'
        } else {
            return ''
        }
    }

    const deleteCard = async (cardId) => {
        await dropVigCard(cardId)
        hideModal()
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
                            <div className="card" key={card.name}>
                                <div className="card-body">
                                    <span className="AdminFarVigPage__date">{new Date(card.createdAt).getDate()} / {new Date(card.createdAt).getMonth()} / {new Date(card.createdAt).getFullYear()}
                                    </span>
                                    <p className="AdminFarVigPage__medicine">{card.medicine}</p>
                                    <p className="AdminFarVigPage__patient">
                                        {card.name} {card.lastname}</p>
                                    <p className="AdminFarVigPage__desc">paciente {getSex(card.sex)} de {new Date().getFullYear() - new Date(card.date).getFullYear()} años de edad con medicamento {getPrescribed(card.prescribed)} prescrito presenta los siguientes efectos:</p>
                                    <p className="AdminFarVigPage__effects">{card.effects}</p>
                                    <span onClick={() => deleteCard(card.id)} className="leti-btn">Eliminar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeleteFarmVigModal
