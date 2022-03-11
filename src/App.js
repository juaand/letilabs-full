import React from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import {Route, Redirect, Switch} from 'react-router-dom'
import {useAuthContext} from './contexts/AuthContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Pages/HomePage/Home'
import AboutUs from './components/Pages/AboutUsPage/AboutUs'
import OurCompanies from './components/Pages/OurCompaniesPage/OurCompanies'
import LaboratoriosLetiPage from './components/Pages/LaboratoriosLetiPage/LaboratoriosLetiPage'
import GenvenPage from './components/Pages/GenvenPage/GenvenPage'
import BiocontrolledPage from './components/Pages/BiocontrolledPage/BiocontrolledPage'
import SearchPage from './components/Pages/SearchPage/SearchPage'
import LoginPage from './components/Pages/LoginPage/LoginPage'
import AdminFormsPage from './components/Pages/AdminFormsPage/AdminFormsPage'
import AdminEditPage from './components/Pages/AdminEditPage/AdminEditPage'
import NotFoundPage from './components/Pages/NotFoundPage/NotFoundPage'
import AreasTerapeuticasPage from './components/Pages/AreasTerapeuticasPage/AreasTerapeuticasPage'
import IYDPage from './components/Pages/IYDPage/IYDPage'
import TechPage from './components/Pages/TechPage/TechPage'
import ManufacturePage from './components/Pages/ManufacturePage/ManufacturePage'
import AlliancesPage from './components/Pages/AlliancesPage/AlliancesPage'
import PurposePage from './components/Pages/PurposePage/PurposePage'
import OurPeoplePage from './components/Pages/OurPeoplePage/OurPeoplePage'
import OurPhilosophyPage from './components/Pages/OurPhilosophyPage/OurPhilosophyPage'
import ProductsPage from './components/Pages/ProductsPage/ProductsPage'
import SingleProductPage from './components/Pages/SingleProductPage/SingleProductPage'
import ProductListPage from './components/Pages/ProductListPage/ProductListPage'
import NewsPage from './components/Pages/NewsPage/NewsPage'
import NewsSingle from './components/Pages/NewsSingle/NewsSingle'
import AdminProductPage from './components/Pages/AdminProductPage/AdminProductPage'
import AdminNewsPage from './components/Pages/AdminNewsPage/AdminNewsPage'


function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/sobre-nosotros" render={(props) => <AboutUs {...props} />} />
        <Route exact path="/nuestras-empresas" render={(props) => <OurCompanies {...props} />} />
        <Route exact path="/leti" render={(props) => <LaboratoriosLetiPage {...props} />} />
        <Route exact path="/genven" render={(props) => <GenvenPage {...props} />} />
        <Route exact path="/biocontrolled" render={(props) => <BiocontrolledPage {...props} />} />
        <Route exact path="/areas-terapeuticas" render={(props) => <AreasTerapeuticasPage {...props} />} />
        <Route exact path="/investigacion-y-desarrollo" render={(props) => <IYDPage {...props} />} />
        <Route exact path="/tecnologia" render={(props) => <TechPage {...props} />} />
        <Route exact path="/manufactura" render={(props) => <ManufacturePage {...props} />} />
        <Route exact path="/alianzas" render={(props) => <AlliancesPage {...props} />} />
        <Route exact path="/proposito-y-responsabilidad-social" render={(props) =>
          <PurposePage {...props} />} />
        <Route exact path="/nuestra-gente" render={(props) => <OurPeoplePage {...props} />} />
        <Route exact path="/nuestra-filosofia" render={(props) =>
          <OurPhilosophyPage {...props} />} />
        <Route exact path="/productos" render={(props) => <ProductsPage {...props} />} />
        <Route exact path="/producto" render={(props) => <SingleProductPage {...props} />} />
        <Route exact path="/listado-de-productos" render={(props) => <ProductListPage {...props} />} />
        <Route exact path="/noticias" render={(props) => <NewsPage {...props} />} />
        <Route exact path="/noticia/:id" render={(props) => <NewsSingle {...props} />} />
        <Route exact path="/login" login component={LoginPage} />
        <AuthenticatedRoute exact path="/admin-editar-contenido" render={(props) => <AdminEditPage {...props} user={user} />} />
        <AuthenticatedRoute exact path="/admin-forms" render={(props) => <AdminFormsPage {...props} user={user} />} />
        <AuthenticatedRoute exact path="/admin-productos" render={(props) => <AdminProductPage {...props} user={user} />} />
        <AuthenticatedRoute exact path="/admin-noticias" render={(props) => <AdminNewsPage {...props} user={user} />} />
        <Route exact path="/buscar" render={(props) => <SearchPage {...props} />} />
        <Route path="*" render={() => <NotFoundPage />} />
        {!user && <Redirect to='/' />}
      </Switch>
      <Footer />
    </div>
  )
}

export default App

