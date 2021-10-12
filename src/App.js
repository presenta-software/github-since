import './App.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState, useRef } from 'react'

dayjs.extend(relativeTime)

function App () {
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [btnLabel, setBtnLabel] = useState('Create!')
  const [showError, setShowError] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const tfUsername = useRef()

  const handleGenerate = async e => {
    setBtnLabel('Generating...')
    setShowError(false)
    setShowCard(false)
    setBtnDisabled(true)

    const v = tfUsername.current.value
    const res = await fetch('https://api.github.com/users/' + v)
    const usr = await res.json()
    if (usr.id) {
      console.log(usr)
      const since = dayjs(usr.created_at).toNow(true)
      const res1 = await fetch('https://app.presenta.cc/f/render/p6bqPuaXAj:FqgZArHtI', {
        method: 'POST',
        body: JSON.stringify({
          name: usr.name,
          company: usr.company,
          avatar: usr.avatar_url,
          since: since
        })
      })
      console.log(res1)
      const img = await res1.json()
      console.log(img)
      setShowCard(img.url)
    } else {
      console.log()
      setShowError(usr.message)
    }
    setBtnLabel('Create!')
    setBtnDisabled(false)
  }

  const handleTyping = e => {
    const v = tfUsername.current.value
    if (v.length > 0) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }

  const handleKeyUp = e => {
    const v = tfUsername.current.value
    if (e.keyCode === 13 && v.length > 0) handleGenerate()
  }

  const handleCopyUrl = e => {
    console.log('copy')
  }

  return (
    <div className='App'>

      <h1>
        <span className='alt'>I'm a </span>
        <span className='main'>Github </span>
        <span className='alt'>user</span>
        <span className='main'> Since </span>
        <span className='alt'>···</span>
      </h1>

      <div className='black'>
        <p className='payoff'>👉 Get your personal <mark>Github-Since</mark> card! 👈</p>

        <div className='wrapper'>
          <div className='showcase'>
            <img alt='splash results' src='https://www.presenta.cc/blog/how-to-create-personalized-newsletter-headers-with-presenta-platform/comp.jpg' />
          </div>
        </div>

        <p className='payoff'>💥 Create your own! 💥</p>
      </div>

      <div className='wrapper'>
        <div className='form'>
          <input placeholder='Github username' onKeyUp={handleKeyUp} ref={tfUsername} type='text' onChange={handleTyping} />
          <button disabled={btnDisabled} onClick={handleGenerate}>{btnLabel}</button>
          {showError && <p>{showError}</p>}
        </div>
      </div>

      <div className='wrapper'>
        <div className='card'>
          <div className='inner'>
            {showCard && <img alt='Github User Since Card' src={showCard} />}
          </div>
        </div>
      </div>

      {showCard &&
        <div className='cta'>
          <button onClick={handleCopyUrl}>Copy URL 🚀</button>
        </div>}

      <footer>
        <p>This tool uses <a href='https://www.presenta.cc'>PRESENTA Editor and API</a> for the template and image generation.</p>
        <p>Have a wonderful day! </p>
        <p className='small'>Review the <a href='https://www.presenta.cc/legal/privacy-policy'>Privacy Policy</a>, the <a href='https://www.presenta.cc/legal/cookie-policy'>Cookie Policy</a> and <a href='https://www.presenta.cc/legal/terms-of-service'>Terms Of Use</a> of PRESENTA application and website. </p>
      </footer>

    </div>
  )
}

export default App
