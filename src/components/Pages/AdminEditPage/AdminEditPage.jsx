import './AdminEditPage.css'
import React, {useState} from 'react'
import {Helmet} from 'react-helmet'

import Nav from './Nav/Nav'
import EditHome from './EditHome/EditHome'
import EditAboutUs from './EditAboutUs/EditAboutUs'
import EditOurCompanies from './EditOurCompanies/EditOurCompanies'
import EditOurCompaniesLeti from './EditOurCompaniesLeti/EditOurCompaniesLeti'
import EditIAndD from './EditIAndD/EditIAndD'
import EditIAndDManufactura from './EditIAndDManufactura/EditIAndDManufactura'
import EditIAndDTechnology from './EditIAndDTechnology/EditIAndDTechnology'
import EditIAndDAlliances from './EditIAndDAlliances/EditIAndDAlliances'
import EditPurpose from './EditPurpose/EditPurpose'
import EditOurPeople from './EditOurPeople/EditOurPeople'
import EditProducts from './EditProducts/EditProducts'
import EditNews from './EditNews/EditNews'
import EditOurCompaniesGenven from './EditOurCompaniesGenven/EditOurCompaniesGenven'
import EditOurCompaniesBiocontrolled from './EditOurCompaniesBiocontrolled/EditOurCompaniesBiocontrolled'
import EditTherapeuticalAreas from './EditTherapeuticalAreas/EditTherapeuticalAreas'
import EditOurPhilosophy from './EditOurPhilosophy/EditOurPhilosophy'
import EditTags from './EditTags/EditTags'
import EditProductList from './EditProductsList/EditProductsList'

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
                    <div className="col-sm-2 p-0 AdminEditPage__NavContent">
                        <Nav getActiveItem={getActiveNav} />
                    </div>
                    <div className="col-sm-10 AdminEditPage__Content">
                        {initNavValue === 'inicio' && <EditHome />}
                        {initNavValue === 'sobre-nosotros' && <EditAboutUs />}
                        {initNavValue === 'areas-terapeuticas' && <EditTherapeuticalAreas />}
                        {initNavValue === 'nuestras-empresas' && <EditOurCompanies />}
                        {initNavValue === 'leti' && <EditOurCompaniesLeti />}
                        {initNavValue === 'genven' && <EditOurCompaniesGenven />}
                        {initNavValue === 'biocontrolled' && <EditOurCompaniesBiocontrolled />}
                        {initNavValue === 'investigacion-y-desarrollo' && <EditIAndD />}
                        {initNavValue === 'tecnologia' && <EditIAndDTechnology />}
                        {initNavValue === 'manufactura' && <EditIAndDManufactura />}
                        {initNavValue === 'alianzas' && <EditIAndDAlliances />}
                        {initNavValue === 'proposito-y-responsabilidad-social' && <EditPurpose />}
                        {initNavValue === 'nuestra-gente' && <EditOurPeople />}
                        {initNavValue === 'nuestra-filosofia' && <EditOurPhilosophy />}
                        {initNavValue === 'productos' && <EditProducts />}
                        {initNavValue === 'listado-de-productos' && <EditProductList />}
                        {initNavValue === 'noticias' && <EditNews />}
                        {initNavValue === 'etiquetas' && <EditTags />}
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminEditPage
