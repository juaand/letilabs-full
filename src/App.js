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
import Edit from './components/Pages/Edit/Edit'


function App() {

  const {user} = useAuthContext()

  return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" login component={LoginPage} />
          <AuthenticatedRoute exact path="/admin" render={(props) => <Edit {...props} user={user} />} />
          <Route exact path="/sobre-nosotros" render={(props) => <AboutUs {...props} />} />
          <Route exact path="/nuestras-empresas" render={(props) => <OurCompanies {...props} />} />
          <Route exact path="/buscar" render={(props) => <SearchPage {...props} />} />
         {!user && <Redirect to='/' />}
        </Switch>
        <Footer />
      </div>
  )
}

export default App
