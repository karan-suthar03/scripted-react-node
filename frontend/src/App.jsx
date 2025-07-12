import './App.css'
import NavigationBar from "./components/NavigationBar.jsx";
import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import { Routes, Route, useLocation } from 'react-router-dom';
import Authentication from "./pages/Authentication.jsx";

function App() {
  const location = useLocation();
  const hideNav = location.pathname === '/login';
  return (
    <>
        {!hideNav && <NavigationBar/>}
        <div className='min-h-screen bg-[#FEFCF9] flex items-center justify-center'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/story" element={<Story />} />
                <Route path="/login" element={<Authentication />} />
            </Routes>
        </div>
    </>
  )
}

export default App
