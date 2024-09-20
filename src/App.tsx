import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Product } from './pages/Product';
import { Profile } from './pages/Profile';
import { ProductSearch } from './pages/ProductSearch';
import { Login } from './pages/Login'
import { ProductRegister } from './pages/ProductRegister';
import { AddressGrocery } from './pages/AddressGrocery';
import { SuccessfulRegister } from './pages/SuccessfulRegister';
import { ProfileRegister } from './pages/ProfileRegister';
import { LoginAdm } from './pages/LoginAdm';
import { Validation } from './pages/Validation';
import { ListValidation } from './pages/ListValidation';
import { ProvideAuth } from './contexts/AuthContext';
import  PrivateRoute  from './Components/PrivateRoute/PrivateRoute';
import AdminPrivateRoute from './Components/AdminPrivateRoute/AdminPrivateRoute';
import { ProvideAdminAuth } from './contexts/AdminAuthContext';
import { ValidationBusiness } from './pages/ValidationBusiness';

function App() {
  return (
    <ProvideAuth>
      <ProvideAdminAuth>
      <Router>
        <Routes>    
            {/* rotas públicas users */}
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile_register' element={<ProfileRegister/>}/>
            <Route path="/"  element={<Login/>} />
            {/* Fim das rotas públicas users */}

             {/* rotas privadas usuários regulares */}
            <Route path="/user" element={<PrivateRoute/>}>
              <Route path='search' element={<ProductSearch />} />
              <Route path="product"  element={<Product/>} />
              <Route path="profile"  element={<Profile/>} />
              <Route path='register' element={<ProductRegister/>}/>
              <Route path='address_grocery' element={<AddressGrocery/>}/>
              <Route path='success' element={<SuccessfulRegister/>}/>
            </Route >
            {/* Fim das rotas privadas usuários regulares */}
            
            {/* rotas públicas Adm */}
            <Route path='/login_adm' element={<LoginAdm/>}/>
            {/* Fim das rotas públicas Adm */}
            
            {/* rotas privadas usuários administradores */}
            <Route path="/adm" element={<AdminPrivateRoute/>}>
              <Route path='list_validation'element={<ListValidation/>} />
              <Route path='validation'element={<Validation/>} />
              <Route path='business' element={<ValidationBusiness/>} />
            </Route>
            {/* Fim das rotas privadas usuários administradores */}

        </Routes>
      </Router>
      </ProvideAdminAuth>
    </ProvideAuth>
  )
}

export default App;