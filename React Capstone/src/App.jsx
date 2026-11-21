import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import BookingPage from './pages/BookingPage'
import './App.css'

function App() {
  return (
    <div className="site-shell">
      <Header />
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
