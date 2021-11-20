import './AdminEditPage.css'
import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import Nav from './Nav/Nav'
import EditInicio from './EditInicio/EditInicio'
import SobreNosotros from './SobreNosotros/SobreNosotros'
import NuestrasEmpresas from './NuestrasEmpresas/NuestrasEmpresas'
import IAndD from './IAndD/IAndD'
import Proposito from './Proposito/Proposito'
import NuestraGente from './NuestraGente/NuestraGente'
import Productos from './Productos/Productos'
import Noticias from './Noticias/Noticias'

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
                        {initNavValue === 'inicio' && <EditInicio />}
                        {initNavValue === 'sobre-nosotros' && <SobreNosotros />}
                        {initNavValue === 'nuestras-empresas' && <NuestrasEmpresas />}
                        {initNavValue === 'investigacion-y-desarrollo' && <IAndD />}
                        {initNavValue === 'proposito-y-responsabilidad-social' && <Proposito />}
                        {initNavValue === 'nuestra-gente' && <NuestraGente />}
                        {initNavValue === 'productos' && <Productos />}
                        {initNavValue === 'noticias' && <Noticias />}
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminEditPage
