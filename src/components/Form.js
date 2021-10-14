import { useState, useRef } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import scaleValue from './utils/scaleValue'
dayjs.extend(relativeTime)

const Form = ({ onBeginAction, onHandleAction, onHandleError }) => {
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [btnLabel, setBtnLabel] = useState('Create!')
  const tfUsername = useRef()

  const handleGenerate = async e => {
    setBtnLabel('Generating...')
    onBeginAction()

    setBtnDisabled(true)

    tfUsername.current.blur()
    const v = tfUsername.current.value
    const res = await fetch('https://api.github.com/users/' + v)
    const usr = await res.json()
    if (usr.id) {
      const workAt = usr.company ? `, works in ${usr.company}` : ''
      const text = `has ${usr.public_repos} repos, ${usr.public_gists} gists${workAt}, followed by ${usr.followers} and follows ${usr.following} people.`

      const diff = dayjs(usr.created_at).valueOf()
      const start = dayjs('2007-10-20T05:24:19Z').valueOf()
      const end = dayjs().valueOf()
      const perc = scaleValue(diff, [start, end], [100, 0])

      const bx = scaleValue(perc, [0, 100], [88, 0]) + 6
      const bw = scaleValue(100 - perc, [0, 100], [88, 0])

      const name = usr.name || usr.login

      const ob = {
        name,
        text,
        avatar: usr.avatar_url,
        footer: `${name} is a GitHub User since ${dayjs(usr.created_at).toNow(true)}`,
        'bluebar[coords][left]': bx,
        'bluebar[coords][width]': bw,
        'signup[coords][left]': bx
      }

      const res1 = await fetch('https://app.presenta.cc/f/render/zGywhb2oJn:fAapXMBCk', {
        method: 'POST',
        body: JSON.stringify(ob)
      })

      const img = await res1.json()
      onHandleAction(img.url, name)
    } else {
      onHandleError(usr.message)
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

  const handleSample = e => {
    tfUsername.current.value = 'presenta-software'
    setBtnDisabled(false)
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className='wrapper'>
      <div className='form'>
        <input placeholder='type a GitHub username' onKeyUp={handleKeyUp} ref={tfUsername} type='text' onChange={handleTyping} />
        <p onClick={handleSample}>I don't know. Use the sample.</p>
        <button disabled={btnDisabled} onClick={handleGenerate}>{btnLabel}</button>

      </div>
    </div>
  )
}

export default Form
