import React, {useState, useEffect} from 'react'

import './AdminNavPage.css'

import Loader from '../../Loader/Loader'
import EditNavigation from './EditPortafolio/EditNavigation'

function AdminNavPage() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(false)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
        {loading && <Loader message="Cargando navegación..." />}
        <main className="container-fluid AdminNavPage">
            <div className="row">
                <div className="col-12 AdminNavPage__bg">
                    <div className="container">
                        <EditNavigation/>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default AdminNavPage