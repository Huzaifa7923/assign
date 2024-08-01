import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { EmployeeProvider } from './context/EmployeeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <EmployeeProvider>
      <ToastContainer/>
    <BrowserRouter> 
    
    <App />
    
    </BrowserRouter>
    </EmployeeProvider>
    
  // </React.StrictMode>,
)
