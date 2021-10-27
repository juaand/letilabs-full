import React from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useAuthContext} from './contexts/AuthContext'
import Home from './components/Layouts/Home/Home'


function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        {/*  <Route exact path="/login" login component={Login} />
        <Route exact path="/register" login component={Register} />
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
      {/* <Footer /> */}
    </div>
  )
}

export default App
