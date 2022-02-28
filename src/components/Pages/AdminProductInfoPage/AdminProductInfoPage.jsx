import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import DeleteFarmVigModal from './DeleteFarmVigModal/DeleteFarmVigModal'
import {getProductInfoForm} from '../../../services/ApiClient'
import {JSONToCSVConvertor} from '../../../helpers/globals'
import Loader from '../../Loader/Loader'
import './AdminProductInfoPage.css'


function AdminProductInfoPage() {


    const [productInfo, setProductInfo] = useState([])
    const [search, setSearch] = useState('')
    const [bool, setBool] = useState(false)
    const [card, setCard] = useState([])
    const [loading, setLoading] = useState(true)

    const filteredCards = productInfo.filter(card => {
        return (
            card.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.lastname.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.license.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.work.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const showModal = (farmVig) => {
        setCard(farmVig)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setProductInfo(info)
        setBool(!bool)
    }

    const updateCardsData = async () => {
        const allFarmVig = await getProductInfoForm()
        setProductInfo(allFarmVig)
    }

    useEffect(() => {
        const fetchData = async () => {
            const allFarmVig = await getProductInfoForm()
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
                <title>Grupo Leti | Administrador Formulario Productos</title>
            </Helmet>
            <main className="container-fluid AdminProductInfoPage">
                {bool && <DeleteFarmVigModal card={card} hideModal={(info) => hideModal(info)} data={updateCardsData} />}
                <div className="row">
                    <div className="col-12 AdminProductInfoPage__bg">
                        <div className="container">
                            <input type="text" className="form-control AdminProductInfoPage__search" placeholder="Filtrar por nombre, apellido, licencia o institución del doctor(a)" onChange={handleChange} value={search} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <button className="AdminProductInfoPage__download" onClick={() => JSONToCSVConvertor(filteredCards, "", true)}
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
                                            <span onClick={() => showModal(farmVig)} className="AdminProductInfoPage__delete"></span>
                                            <span className="AdminProductInfoPage__date">{new Date(farmVig.createdAt).getDate()} / {new Date(farmVig.createdAt).getMonth()} / {new Date(farmVig.createdAt).getFullYear()}
                                            </span>
                                            <p className="AdminProductInfoPage__medicine">Dr/a. {farmVig.name} {farmVig.lastname}</p>
                                            <div className="AdminProductInfoPage__info">
                                                <p className="AdminProductInfoPage__datainfo">
                                                    <strong>Institución</strong> {farmVig.work}</p>
                                                <p className="AdminProductInfoPage__datainfo">
                                                    <strong>Especialidad</strong> {farmVig.speciality}</p>
                                                <p className="AdminProductInfoPage__datainfo">
                                                    <strong>Años de servicio</strong> {farmVig.years}</p>
                                                <p className="AdminProductInfoPage__datainfo">
                                                    <strong>Licencia</strong> {farmVig.license}</p>
                                            </div>
                                            <a href={`mailto:${farmVig.mail}`} className="AdminProductInfoPage__patient-email">
                                                {(farmVig.mail).toLocaleLowerCase()}
                                            </a>
                                            <p className="AdminProductInfoPage__desc">Desea la siguiente información</p>
                                            <p className="AdminProductInfoPage__effects">{farmVig.info}</p>
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

export default AdminProductInfoPage

