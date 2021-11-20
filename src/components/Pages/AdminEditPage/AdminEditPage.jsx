import './AdminEditPage.css'
import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import Nav from './Nav/Nav'
import EditInicio from './EditInicio/EditInicio'
import EditSobreNosotros from './EditSobreNosotros/EditSobreNosotros'
import EditNuestrasEmpresas from './EditNuestrasEmpresas/EditNuestrasEmpresas'
import EditIAndD from './EditIAndD/EditIAndD'
import EditProposito from './EditProposito/EditProposito'
import EditNuestraGente from './EditNuestraGente/EditNuestraGente'
import EditProductos from './EditProductos/EditProductos'
import EditNoticias from './EditNoticias/EditNoticias'

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
                        {initNavValue === 'sobre-nosotros' && <EditSobreNosotros />}
                        {initNavValue === 'nuestras-empresas' && <EditNuestrasEmpresas />}
                        {initNavValue === 'investigacion-y-desarrollo' && <EditIAndD />}
                        {initNavValue === 'proposito-y-responsabilidad-social' && <EditProposito />}
                        {initNavValue === 'nuestra-gente' && <EditNuestraGente />}
                        {initNavValue === 'productos' && <EditProductos />}
                        {initNavValue === 'noticias' && <EditNoticias />}
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminEditPage
