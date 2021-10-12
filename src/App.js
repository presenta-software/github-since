import './App.css'
import { useState } from 'react'

import MainHead from './components/MainHead'
import Showcase from './components/Showcase'
import Footer from './components/Footer'
import Form from './components/Form'
import Card from './components/Card'
import Copy from './components/Copy'
import Error from './components/Error'

function App () {
  const [showError, setShowError] = useState(false)
  const [showCard, setShowCard] = useState(false)

  const handleBegin = () => {
    setShowError(false)
    setShowCard(false)
  }

  const handleAction = (url) => {
    setShowCard(url)
  }

  const handleError = (msg) => {
    setShowError(msg)
  }

  return (
    <div className='App'>

      <MainHead />
      <Showcase />
      <Form
        onHandleAction={handleAction}
        onHandleError={handleError}
        onBeginAction={handleBegin}
      />

      {showError && <Error message={showError} />}

      <Card url={showCard} />
      {showCard && <Copy url={showCard} />}

      <Footer />

    </div>
  )
}

export default App
