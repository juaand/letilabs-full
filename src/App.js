import React, {Suspense} from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import {Route, Redirect, Switch} from 'react-router-dom'
import {useAuthContext} from './contexts/AuthContext'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import SearchPage from './components/Pages/SearchPage/SearchPage'
import LoginPage from './components/Pages/LoginPage/LoginPage'
import AdminPage from './components/Pages/AdminPage/AdminPage'
import NotFoundPage from './components/Pages/NotFoundPage/NotFoundPage'
import AdminFarVigPage from './components/Pages/AdminFarVigPage/AdminFarVigPage'
import AdminEditPage from './components/Pages/AdminEditPage/AdminEditPage'
import Loader from './components/Loader/Loader'


function App() {
  const Home = React.lazy(() => import('./components/Pages/HomePage/Home'))
  const AboutUs = React.lazy(() => import('./components/Pages/AboutUsPage/AboutUs'))
  const OurCompanies = React.lazy(() => import('./components/Pages/OurCompaniesPage/OurCompanies'))
  const LaboratoriosLetiPage = React.lazy(() => import('./components/Pages/LaboratoriosLetiPage/LaboratoriosLetiPage'))
  const GenvenPage = React.lazy(() => import('./components/Pages/GenvenPage/GenvenPage'))
  const BiocontrolledPage = React.lazy(() => import('./components/Pages/BiocontrolledPage/BiocontrolledPage'))

  const {user} = useAuthContext()

  return (
    <div className="App">
      <Header />
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/sobre-nosotros" render={(props) => <AboutUs {...props} />} />
          <Route exact path="/nuestras-empresas" render={(props) => <OurCompanies {...props} />} />
          <Route exact path="/laboratorios-leti" render={(props) => <LaboratoriosLetiPage {...props} />} />
          <Route exact path="/genven" render={(props) => <GenvenPage {...props} />} />
          <Route exact path="/biocontrolled" render={(props) => <BiocontrolledPage {...props} />} />
        </Suspense>
        <Route exact path="/login" login component={LoginPage} />
        <AuthenticatedRoute exact path="/admin" render={(props) => <AdminPage {...props} user={user} />} />
        <AuthenticatedRoute exact path="/admin-editar-contenido" render={(props) => <AdminEditPage {...props} user={user} />} />
        <AuthenticatedRoute exact path="/admin-farmacovigilancia" render={(props) => <AdminFarVigPage {...props} user={user} />} />
        <Route exact path="/buscar" render={(props) => <SearchPage {...props} />} />
        <Route path="*" render={() => <NotFoundPage />} />
        {!user && <Redirect to='/' />}
      </Switch>
      <Footer />
    </div>
  )
}

export default App
