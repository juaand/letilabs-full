import React from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import {Route, Redirect, Switch} from 'react-router-dom'
import {useAuthContext} from './contexts/AuthContext'
import Home from './components/Pages/HomePage/Home'
import AboutUs from './components/Pages/AboutUsPage/AboutUs'
import OurCompanies from './components/Pages/OurCompaniesPage/OurCompanies'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import SearchPage from './components/Pages/SearchPage/SearchPage'
import LoginPage from './components/Pages/LoginPage/LoginPage'
import AdminPage from './components/Pages/AdminPage/AdminPage'
import NotFoundPage from './components/Pages/NotFoundPage/NotFoundPage'
import AdminFarVigPage from './components/Pages/AdminFarVigPage/AdminFarVigPage'
import AdminEditPage from './components/Pages/AdminEditPage/AdminEditPage'


function App() {

  const {user} = useAuthContext()

  return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} title="Inicio"/>} />
          <Route exact path="/login" login component={LoginPage} />
          <AuthenticatedRoute exact path="/admin" render={(props) => <AdminPage {...props} user={user} />} />
          <AuthenticatedRoute exact path="/admin-editar-contenido" render={(props) => <AdminEditPage {...props} user={user} />} />
          <AuthenticatedRoute exact path="/admin-farmacovigilancia" render={(props) => <AdminFarVigPage {...props} user={user} />} />
          <Route exact path="/sobre-nosotros" render={(props) => <AboutUs {...props} />} />
          <Route exact path="/nuestras-empresas" render={(props) => <OurCompanies {...props} title="Nuestras empresas"/>} />
          <Route exact path="/buscar" render={(props) => <SearchPage {...props} title="Buscar"/>} />
          <Route path="*" render={() => <NotFoundPage />} />
         {!user && <Redirect to='/' />}
        </Switch>
        <Footer />
      </div>
  )
}

export default App
