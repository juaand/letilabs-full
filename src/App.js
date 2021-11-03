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
import LoginAdmin from './components/Pages/LoginAdmin/LoginAdmin'
import Edit from './components/Pages/Edit/Edit'


function App() {

  const {user} = useAuthContext()

  return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" login component={LoginAdmin} />
          <AuthenticatedRoute exact path="/admin/edit" component={Edit} user={user}/>
          <Route exact path="/sobre-nosotros" render={(props) => <AboutUs {...props} />} />
          <Route exact path="/nuestras-empresas" render={(props) => <OurCompanies {...props} />} />
          <Route exact path="/buscar" render={(props) => <SearchPage {...props} />} />
          {user && <Redirect to='/admin/edit' />}
          {/*  <Route exact path="/register" login component={Register} />
        <Route exact path='/activate/:token' render={(props) => <Login {...props} confirmed />} />
        <AuthenticatedRoute exact path="/pacientes" render={(props) => <Patients {...props} user={user} />} />
        <AuthenticatedRoute exact path="/biopsias" render={(props) => <MyInfo {...props} user={user} />} />
        <AuthenticatedRoute exact path="/update-password" render={(props) =>
          <UpdatePassword {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nueva-biopsia" render={(props) => <NewBiopsy {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nuevo-paciente" render={(props) => <NewPatient {...props} user={user} />} />
        {/*  */}
          {/* {!user && <Redirect to='/login' />} */}
        </Switch>
        <Footer />
      </div>
  )
}

export default App
