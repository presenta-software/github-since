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
  const [showName, setShowName] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleBegin = () => {
    setShowError(false)
    setShowCard(false)
    setIsLoading(true)
  }

  const handleAction = (url, name) => {
    setShowCard(url)
    setShowName(name)
    setIsLoading(false)
  }

  const handleError = (msg) => {
    setShowError(msg)
    setIsLoading(false)
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

      <Card url={showCard} loading={isLoading} />
      {showCard && <Copy url={showCard} name={showName} />}

      <Footer />

    </div>
  )
}

export default App
