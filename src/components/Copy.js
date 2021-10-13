import { useState } from 'react'
import copyClipboard from './utils/copyClipboard'

const Copy = ({ url }) => {
  const [btnCopyLabel, setBtnCopyLabel] = useState('Copy URL 🚀')
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = e => {
    copyClipboard(url)
    setBtnCopyLabel('👉 You got it! 👋')
    setCopied(true)
  }

  return (
    <div className='cta'>
      <button onClick={handleCopyUrl}>{btnCopyLabel}</button>
      {copied && <p>Great! Now you can share this GitHub-Since card. <br />Simply paste the URL where you want!</p>}
    </div>
  )
}

export default Copy
