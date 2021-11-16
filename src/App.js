import React, {Suspense} from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import {Route, Redirect, Switch} from 'react-router-dom'
import {useAuthContext} from './contexts/AuthContext'
import Loader from './components/Loader/Loader'


function App() {

  const {user} = useAuthContext()

  const Home = React.lazy(() => import('./components/Pages/HomePage/Home'))
  const AboutUs = React.lazy(() => import('./components/Pages/AboutUsPage/AboutUs'))
  const OurCompanies = React.lazy(() => import('./components/Pages/OurCompaniesPage/OurCompanies'))
  const Footer = React.lazy(() => import('./components/Footer/Footer'))
  const Header = React.lazy(() => import('./components/Header/Header'))
  const SearchPage = React.lazy(() => import('./components/Pages/SearchPage/SearchPage'))
  const LoginPage = React.lazy(() => import('./components/Pages/LoginPage/LoginPage'))
  const AdminPage = React.lazy(() => import('./components/Pages/AdminPage/AdminPage'))
  const NotFoundPage = React.lazy(() => import('./components/Pages/NotFoundPage/NotFoundPage'))
  const AdminFarVigPage = React.lazy(() => import('./components/Pages/AdminFarVigPage/AdminFarVigPage'))
  const AdminEditPage = React.lazy(() => import('./components/Pages/AdminEditPage/AdminEditPage'))
  const LaboratoriosLetiPage = React.lazy(() => import('./components/Pages/LaboratoriosLetiPage/LaboratoriosLetiPage'))
  const GenvenPage = React.lazy(() => import('./components/Pages/GenvenPage/GenvenPage'))
  const BiocontrolledPage = React.lazy(() => import('./components/Pages/BiocontrolledPage/BiocontrolledPage'))

  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/login" login component={LoginPage} />
          <AuthenticatedRoute exact path="/admin" render={(props) => <AdminPage {...props} user={user} />} />
          <AuthenticatedRoute exact path="/admin-editar-contenido" render={(props) => <AdminEditPage {...props} user={user} />} />
          <AuthenticatedRoute exact path="/admin-farmacovigilancia" render={(props) => <AdminFarVigPage {...props} user={user} />} />
          <Route exact path="/sobre-nosotros" render={(props) => <AboutUs {...props} />} />
          <Route exact path="/nuestras-empresas" render={(props) => <OurCompanies {...props} />} />
          <Route exact path="/laboratorios-leti" render={(props) => <LaboratoriosLetiPage {...props} />} />
          <Route exact path="/genven" render={(props) => <GenvenPage {...props} />} />
          <Route exact path="/biocontrolled" render={(props) => <BiocontrolledPage {...props} />} />
          <Route exact path="/buscar" render={(props) => <SearchPage {...props} />} />
          <Route path="*" render={() => <NotFoundPage />} />
          {!user && <Redirect to='/' />}
        </Switch>
        <Footer />
      </div>
    </Suspense>
  )
}

export default App
