import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Communtiy'
import { useState } from 'react'
import { assets } from './assets/assets'
import './assets/prism.css' 

const App = () => {
  const [isMenuopen, setisMenuopen] = useState(false)
  return (
    <>
    {!isMenuopen && <img src={assets.menu_icon} className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert" alt="Menu" onClick={() => setisMenuopen(true)} />}
    <div className='dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuopen={isMenuopen} setisMenuopen={setisMenuopen} />
      <Routes>
         <Route path='/' element={<ChatBox/>} />
         <Route path='/credits' element={<Credits/>} />
         <Route path='/community' element={<Community/>} />
      </Routes>
      </div>
    </div>
    </>
  )
}

export default App