import { useState } from 'react'
import copyClipboard from './utils/copyClipboard'

const Copy = ({ url, name }) => {
  const [btnCopyLabel, setBtnCopyLabel] = useState('Copy sharable URL 🚀')
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
    setBtnCopyLabel('👉 There you go! 👋')
    setCopied(true)
  }

  return (
    <div className='cta'>
      <p><a href={url} target='_blank' rel='noreferrer'>Download the image</a> or</p>
      <button onClick={handleCopyUrl}>{btnCopyLabel}</button>
      {copied && <p>Share this GitHub-Since URL <br />on your preferred social platform!</p>}
    </div>
  )
}

export default Copy
