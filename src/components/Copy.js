import { useState } from 'react'
import copyClipboard from './utils/copyClipboard'

const Copy = ({ url }) => {
  const [btnCopyLabel, setBtnCopyLabel] = useState('Copy URL 🚀')

  const handleCopyUrl = e => {
    copyClipboard(url)
    setBtnCopyLabel('👉 You got it! 👋')
  }

  return (
    <div className='cta'>
      <button onClick={handleCopyUrl}>{btnCopyLabel}</button>
    </div>
  )
}

export default Copy
