import './AdminFarVigPage.css'
import React, {useState, useEffect} from 'react'
import {getFarmVigData} from '../../../services/ApiClient'

function AdminFarVigPage() {

    const [farVig, setFarVig] = useState([])

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
        <main className="container">
            <h1>FARMACO VIGILANCIA PAGE</h1>
            {farVig.map(farmVig =>
                <div className="card" key={farmVig.id}>
                    <div className="card-body">
                        <p>{farmVig.medicine}</p>
                        <h5 className="card-title">{farmVig.name}</h5>
                        <p>{farmVig.effects}</p>
                        <p>{farmVig.prescribed}</p>
                        <p>{new Date().getFullYear() - new Date(farmVig.date).getFullYear()}</p>
                    </div>
                </div>
            )}
        </main>
    )
}

export default AdminFarVigPage
