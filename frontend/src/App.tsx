import './App.css'
import { Routes , BrowserRouter, Route } from 'react-router-dom'
import { DashBoard } from './Pages/DashBoard'
import { Viewer } from './Pages/Viewer'
import { Creator } from './Pages/Creator'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/viewer' element={<Viewer />} />
        <Route path='/creator' element={<Creator />} />
      </Routes>
    </ BrowserRouter>
  )
}

export default App
