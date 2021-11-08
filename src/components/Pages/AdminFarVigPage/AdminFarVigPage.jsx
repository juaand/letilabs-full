import './AdminFarVigPage.css'
import React, {useState, useEffect} from 'react'
import {getFarmVigData} from '../../../services/ApiClient'

function AdminFarVigPage() {

    const [farVig, setFarVig] = useState([])

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

    useEffect(() => {
        const fetchData = async () => {
            const allFarmVig = await getFarmVigData()
            setFarVig(allFarmVig)
            console.log(allFarmVig)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // date: "2021-11-06T11:24:06.751Z"
    // effects: "Dolor de cabeza"
    // id: "618665d623ab09697262d7d3"
    // medicine: "Alivet"
    // name: "Sarah"
    // prescribed: "No"
    // sex: "F"

    return (
        <main className="container-fluid AdminFarVigPage">
            <div className="row">
                <div className="col-12 AdminFarVigPage__bg"></div>
            </div>
            <div className="container">
                <div className="row">
                    {farVig.map(farmVig =>
                        <div className="col-sm-4">
                            <div className="card" key={farmVig.id}>
                                <div className="card-body">
                                <span className="AdminFarVigPage__date">{new Date(farmVig.createdAt).getDate()} / {new Date(farmVig.createdAt).getMonth()} / {new Date(farmVig.createdAt).getFullYear()}</span>
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
    )
}

export default AdminFarVigPage
