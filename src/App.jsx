import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css' 
import { Layout, CreatePayment, List, CreateService, NotFound, ExpiratedList, Login, Logout } from './components'


function App() {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  return (
    <Routes>
      <Route path='/' element={authTokens ? <Layout /> : <Navigate to='/login' />}>
        <Route index element ={<List />}/>
        <Route path='/lists-payment' element={<List />}/>
        <Route path='/lists-expirated-payment' element={<ExpiratedList />}/>
        <Route path='/create-payment' element={<CreatePayment />}/>
        <Route path='/services' element={<CreateService />}/>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App
