import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import DeleteFarmVigModal from './DeleteFarmVigModal/DeleteFarmVigModal'
import {getLeadsFormData} from '../../../services/ApiClient'
import {JSONToCSVConvertor} from '../../../helpers/globals'
import Loader from '../../Loader/Loader'
import './AdminLeadsPage.css'


function AdminLeadsPage() {


    const [productInfo, setProductInfo] = useState([])
    const [search, setSearch] = useState('')
    const [bool, setBool] = useState(false)
    const [card, setCard] = useState([])
    const [loading, setLoading] = useState(true)

    const filteredCards = productInfo.filter(card => {
        return (
            card.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.lastname.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.country.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.company.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.phone.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.mail.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const showModal = (farmVig) => {
        setCard(farmVig)
        setBool(!bool)
    }

    const updateCardsData = async (info) => {
        setProductInfo(info)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const allFarmVig = await getLeadsFormData()
            setProductInfo(allFarmVig)
            setLoading(false)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader message="Cargando mensajes..." />}
            <Helmet>
                <title>Grupo LETI | Administrador Formulario Productos</title>
            </Helmet>
            <main className="container-fluid AdminLeadsPage">
                {bool && <DeleteFarmVigModal card={card} hideModal={(info) => updateCardsData(info)} updateData={(info) => updateCardsData(info)} closeModal={() => setBool(!bool)} />}
                <div className="row">
                    <div className="col-12 AdminLeadsPage__bg">
                        <div className="container">
                            <input type="text" className="form-control AdminLeadsPage__search" placeholder="Filtrar por nombre, apellido, correo electrónico, país o compañía" onChange={handleChange} value={search} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <button className="AdminLeadsPage__download" onClick={() => JSONToCSVConvertor(filteredCards, "", true)}
                            >Descargar reporte</button>
                        </div>
                    </div>
                    <div className="row">
                        {filteredCards.length === 0 ?
                            <h1 className="col-12 loader">Sin <span>resultados</span></h1> :
                            filteredCards.map(farmVig =>
                                <div className="col-sm-4">
                                    <div className="card" key={farmVig.id}>
                                        <div className="card-body">
                                            <span onClick={() => showModal(farmVig)} className="AdminLeadsPage__delete"></span>
                                            <span className="AdminLeadsPage__date">{new Date(farmVig.createdAt).getDate()} / {new Date(farmVig.createdAt).getMonth()} / {new Date(farmVig.createdAt).getFullYear()}
                                            </span>
                                            <p className="AdminLeadsPage__medicine">Dr/a. {farmVig.name} {farmVig.lastname}</p>
                                            <div className="AdminLeadsPage__info">
                                                <p className="AdminLeadsPage__datainfo">
                                                    <strong>Teléfono</strong> {farmVig.phone}</p>
                                                <p className="AdminLeadsPage__datainfo">
                                                    <strong>País</strong> {farmVig.country}</p>
                                                <p className="AdminLeadsPage__datainfo">
                                                    <strong>Compañía</strong> {farmVig.company}</p>
                                            </div>
                                            <a href={`mailto:${farmVig.mail}`} className="AdminLeadsPage__patient-email">
                                                {(farmVig.mail).toLocaleLowerCase()}
                                            </a>
                                            <p className="AdminLeadsPage__desc">A escrito el siguiente mensaje:</p>
                                            <p className="AdminLeadsPage__effects">{farmVig.message}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminLeadsPage

