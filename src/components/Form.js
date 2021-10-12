import { useState, useRef } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
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
      onHandleAction(img.url)
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

  return (
    <div className='wrapper'>
      <div className='form'>
        <input placeholder='Github username' onKeyUp={handleKeyUp} ref={tfUsername} type='text' onChange={handleTyping} />
        <button disabled={btnDisabled} onClick={handleGenerate}>{btnLabel}</button>

      </div>
    </div>
  )
}

export default Form
