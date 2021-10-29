import React from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useAuthContext} from './contexts/AuthContext'
import Home from './components/Screens/Home/Home'
import AboutUs from './components/Screens/AboutUs/AboutUs'
import OurCompanies from './components/Screens/OurCompanies/OurCompanies'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'


function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sobre-nosotros" render={(props) => <AboutUs {...props} />} />
        <Route exact path="/nuestras-empresas" render={(props) => <OurCompanies {...props} />} />
        {/*  <Route exact path="/register" login component={Register} />
        <Route exact path='/activate/:token' render={(props) => <Login {...props} confirmed />} />
        <AuthenticatedRoute exact path="/pacientes" render={(props) => <Patients {...props} user={user} />} />
        <AuthenticatedRoute exact path="/biopsias" render={(props) => <MyInfo {...props} user={user} />} />
        <AuthenticatedRoute exact path="/update-password" render={(props) =>
          <UpdatePassword {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nueva-biopsia" render={(props) => <NewBiopsy {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nuevo-paciente" render={(props) => <NewPatient {...props} user={user} />} />
        {/* {user && <Redirect to='/biopsias' />} */}
        {/* {!user && <Redirect to='/login' />} */}
      </Switch>
      <Footer />
    </div>
  )
}

export default App
