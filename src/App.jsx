import { Routes,Route } from 'react-router-dom'
import Employees from './screens/Employees'
import EmployeeProfile from './screens/EmployeeProfile'
import AddEmployee from './screens/AddEmployee'

function App() {
  return (
    <div >
    <Routes>
      <Route path='/' element={<Employees/>}/>
      <Route path='/employee/new' element={<AddEmployee/>}/>
      <Route path='/employee/:id' element={<EmployeeProfile/>}/>
    </Routes>
    </div>
  )
}

export default App
