import { Outlet } from 'react-router'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
      <div>
        <NavBar></NavBar>
        <div className='min-h-screen bg-gray-100'>
         <Outlet />
         <Toaster position="top-center" reverseOrder={false} />
        </div>
         <Footer></Footer>
      </div>
  )
}

export default App
