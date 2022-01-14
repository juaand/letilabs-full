import './AdminEditPage.css'
import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import Nav from './Nav/Nav'
import EditHome from './EditHome/EditHome'
import EditAboutUs from './EditAboutUs/EditAboutUs'
import EditOurCompanies from './EditOurCompanies/EditOurCompanies'
import EditOurCompaniesLeti from './EditOurCompaniesLeti/EditOurCompaniesLeti'
import EditIAndD from './EditIAndD/EditIAndD'
import EditPurpose from './EditPurpose/EditPurpose'
import EditOurPeople from './EditOurPeople/EditOurPeople'
import EditProducts from './EditProducts/EditProducts'
import EditNews from './EditNews/EditNews'

function AdminEditPage() {

    const [initNavValue, setInitNavValue] = useState('inicio')

    const getActiveNav = (activeNav) => {
        setInitNavValue(activeNav)
    }

    return (
        <>

            <Helmet>
                <title>Grupo Leti | Administrador de contenidos</title>
            </Helmet>
            <main className="container-fluid AdminEditPage">
                <div className="row">
                    <div className="col-2 p-0 AdminEditPage__NavContent">
                        <Nav getActiveItem={getActiveNav} />
                    </div>
                    <div className="col-10 AdminEditPage__Content">
                        {initNavValue === 'inicio' && <EditHome />}
                        {initNavValue === 'sobre-nosotros' && <EditAboutUs />}
                        {initNavValue === 'nuestras-empresas' && <EditOurCompanies />}
                        {initNavValue === 'nuestras-empresas-leti' && <EditOurCompaniesLeti />}
                        {initNavValue === 'investigacion-y-desarrollo' && <EditIAndD />}
                        {initNavValue === 'proposito-y-responsabilidad-social' && <EditPurpose />}
                        {initNavValue === 'nuestra-gente' && <EditOurPeople />}
                        {initNavValue === 'productos' && <EditProducts />}
                        {initNavValue === 'noticias' && <EditNews />}
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminEditPage
