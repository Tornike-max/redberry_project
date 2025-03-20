
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/realEstate/:realEstateId"
            // element={<ShowRealEstate />}
          />
          {/* <Route path="/realEstate/create" element={<CreateRealEstate />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
