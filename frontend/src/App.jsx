import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectedWraapper from './pages/UserProtectedWraapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element = {<Start/>}/>
        <Route path='/login' element = {<UserLogin/>}/>
        <Route path='/riding' element = {<Riding/>}/>
        <Route path='/signup' element = {<UserSignup/>}/>
        <Route path='/captain-login' element = {<CaptainLogin/>}/>
        <Route path='/captain-signup' element = {<CaptainSignup/>}/>
        <Route path='/home' element = {
          <UserProtectedWraapper>
              <Home/>
        </UserProtectedWraapper>}/>

        <Route path='users/logout' element = {
          <UserProtectedWraapper>
            <UserLogout/>
          </UserProtectedWraapper>
        }/>

        <Route path='/captain-home' element = {
          <CaptainProtectedWrapper>
            <CaptainHome/>
          </CaptainProtectedWrapper>
        }/>

        <Route path='/captain/logout' element = {
          <CaptainProtectedWrapper>
            <CaptainLogout/>
          </CaptainProtectedWrapper>
        }/>

       <Route path='/captain-riding' element = {
        <CaptainProtectedWrapper>
          <CaptainRiding/>
        </CaptainProtectedWrapper>
       }/>
        </Routes>
     
      
    </div>
  )
}

export default App
