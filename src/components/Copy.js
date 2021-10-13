import { useState } from 'react'
import copyClipboard from './utils/copyClipboard'

const Copy = ({ url, name }) => {
  const [btnCopyLabel, setBtnCopyLabel] = useState('Copy URL 🚀')
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = e => {
    const ob = {
      title: `${name} @ GitHub-Since`,
      url: 'https://github-since.presenta.cc/',
      image: url,
      description: 'GitHub-Since allows to generate a personal card using your public GitHub info',
      site: 'GitHub-Since'
    }

    const obstr = JSON.stringify(ob)
    const obstrb = btoa(obstr)

    copyClipboard('https://github-since.presenta.cc/f/share/' + obstrb)
    setBtnCopyLabel('👉 You got it! 👋')
    setCopied(true)
  }

  return (
    <div className='cta'>
      <p><a href={url} target='_blank' rel='noreferrer'>Download the image</a> or</p>
      <button onClick={handleCopyUrl}>{btnCopyLabel}</button>
      {copied && <p>Great! Now you can share this GitHub-Since card. <br />Simply paste the URL where you want!</p>}
    </div>
  )
}

export default Copy
