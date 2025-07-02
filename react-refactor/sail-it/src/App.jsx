import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Hero from './components/Hero'
import TopicGrid from './components/TopicGrid'
import Footer from './components/Footer'
import ExercisePage from './pages/ExercisePage'
import ElementosDelBarcoPage from './pages/ElementosDelBarcoPage'
import './App.css'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TopicGrid />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/elementos-del-barco" element={<ElementosDelBarcoPage />} />
      </Routes>
    </Router>
  );
}

export default App
