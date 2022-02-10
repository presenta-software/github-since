import { useState } from 'react'
import copyClipboard from './utils/copyClipboard'

const Copy = ({ url, name }) => {
  const [btnCopyLabel, setBtnCopyLabel] = useState('Copy sharable URL')
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = async e => {
    setBtnCopyLabel('Creating URL... ⏱')
    const ob = {
      title: `${name} @ GitHub-Since`,
      url: 'https://github-since.presenta.cc',
      image: url,
      description: 'GitHub-Since allows to generate a personal card using your public GitHub info',
      site: 'GitHub-Since'
    }

    const obstr = JSON.stringify(ob)
    const obstrb = btoa(obstr)
    const fullurl = process.env.REACT_APP_BASE_SERVICE_URL + obstrb

    const shrtnrUrl = process.env.REACT_APP_SHORTNER_SERVICE_URL
    const shortRes = await fetch(shrtnrUrl, {
      method: 'POST',
      body: JSON.stringify({ url: fullurl })
    })
    const short = await shortRes.json()

    if (!short.url) {
      console.log('error', short)
      return
    }

    copyClipboard(shrtnrUrl + short.url)
    setBtnCopyLabel('👉 Copied! 👈')
    setCopied(shrtnrUrl + short.url)
  }

  const twUrl = 'https://twitter.com/intent/tweet?text=Check this Github-Since Card:&url=' + copied
  const fbUrl = 'https://www.facebook.com/sharer.php?p[title]=Check this Github-Since Card:&p[url]=' + copied

  return (
    <div className='cta'>
      <p><a href={url} target='_blank' rel='noreferrer'>Download the image</a> or</p>
      <button onClick={handleCopyUrl}>{btnCopyLabel}</button>
      {copied && <p>Share on <a target='_blank' href={twUrl} rel='noreferrer'>Twitter</a> or <a target='_blank' href={fbUrl} rel='noreferrer'>Facebook</a></p>}
    </div>
  )
}

export default Copy
