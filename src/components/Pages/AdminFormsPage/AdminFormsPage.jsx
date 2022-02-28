import React, {useState} from 'react'
import {Helmet} from 'react-helmet'

import AdminProductInfoPage from '../AdminProductInfoPage/AdminProductInfoPage'
import AdminFarVigPage from '../AdminFarVigPage/AdminFarVigPage'
import AdminLeadsPage from '../AdminLeadsPage/AdminLeadsPage'
import './AdminFormsPage.css'
import Nav from './Nav/Nav'


function AdminFormsPage() {


    const [initNavValue, setInitNavValue] = useState('farmacovigilancia')

    const getActiveNav = (activeNav) => {
        setInitNavValue(activeNav)
    }

    return (
        <>
            <Helmet>
                <title>Grupo Leti | Administrador Formularios</title>
            </Helmet>
            <main className="container-fluid AdminEditPage">
                <div className="row">
                    <div className="col-2 p-0 AdminEditPage__NavContent">
                        <Nav getActiveItem={getActiveNav} />
                    </div>
                    <div className="col-10">
                        {initNavValue === 'farmacovigilancia' && <AdminFarVigPage />}
                        {initNavValue === 'productos' && <AdminProductInfoPage />}
                        {initNavValue === 'iniciativas' && <AdminLeadsPage />}
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminFormsPage