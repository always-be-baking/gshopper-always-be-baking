import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {ToastContainer, Slide} from 'react-toastify'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ToastContainer className="toast" transition={Slide} />
    </div>
  )
}

export default App
