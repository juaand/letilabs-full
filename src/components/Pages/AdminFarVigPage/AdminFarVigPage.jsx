import './AdminFarVigPage.css'
import React, {useState, useEffect, Suspense} from 'react'
import {getFarmVigData} from '../../../services/ApiClient'
import DeleteFarmVigModal from './DeleteFarmVigModal/DeleteFarmVigModal'
import Seo from '../../Seo/Seo'
import Loader from '../../Loader/Loader'

function AdminFarVigPage() {


    const [farVig, setFarVig] = useState([])
    const [search, setSearch] = useState('')
    const [bool, setBool] = useState(false)
    const [card, setCard] = useState([])

    const filteredCards = farVig.filter(card => {
        return (
            card.medicine.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
            card.lastname.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        )
    })

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

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const showModal = (farmVig) => {
        setCard(farmVig)
        setBool(!bool)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    const updateCardsData = async () => {
        const allFarmVig = await getFarmVigData()
        setFarVig(allFarmVig)
    }

    useEffect(() => {
        const fetchData = async () => {
            const allFarmVig = await getFarmVigData()
            setFarVig(allFarmVig)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Seo title='Grupo Leti | Farmaco vigilancia' />
            <Suspense fallback={<Loader />}>
                <main className="container-fluid AdminFarVigPage">
                    {bool && <DeleteFarmVigModal card={card} hideModal={hideModal} data={updateCardsData} />}
                    <div className="row">
                        <div className="col-12 AdminFarVigPage__bg">
                            <div className="container">
                                <input type="text" className="form-control AdminFarVigPage__search" placeholder="Buscar por producto o nombre del paciente" onChange={handleChange} value={search} /></div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            {filteredCards.length === 0 ?
                                <h1 className="col-12 loader">Sin <span>resultados</span></h1> :
                                filteredCards.map(farmVig =>
                                    <div className="col-sm-4">
                                        <div className="card" key={farmVig.id}>
                                            <div className="card-body">
                                                <span onClick={() => showModal(farmVig)} className="AdminFarVigPage__delete"></span>
                                                <span className="AdminFarVigPage__date">{new Date(farmVig.createdAt).getDate()} / {new Date(farmVig.createdAt).getMonth()} / {new Date(farmVig.createdAt).getFullYear()}
                                                </span>
                                                <p className="AdminFarVigPage__medicine">{farmVig.medicine}</p>
                                                <p className="AdminFarVigPage__patient">
                                                    {farmVig.name} {farmVig.lastname}</p>
                                                <p className="AdminFarVigPage__desc">paciente {getSex(farmVig.sex)} de {new Date().getFullYear() - new Date(farmVig.date).getFullYear()} años de edad con medicamento {getPrescribed(farmVig.prescribed)} prescrito presenta los siguientes efectos:</p>
                                                <p className="AdminFarVigPage__effects">{farmVig.effects}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </main>
            </Suspense>
        </>
    )
}

export default AdminFarVigPage
