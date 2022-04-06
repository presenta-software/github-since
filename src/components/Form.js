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
      const perc = parseInt(scaleValue(diff, [start, end], [0, 100]))
      console.log(perc)

      const name = usr.name || usr.login

      const ob = {
        name,
        text,
        user: usr.login,
        avatar: usr.avatar_url,
<<<<<<< HEAD
        footer: `${name} is a GitHub User for ${dayjs(usr.created_at).toNow(true)}`,
        // 'bluebar[coords][left]': bx,
        // 'bluebar[coords][width]': bw,
        // 'signup[coords][left]': bx,
        bluebar: {
          coords: {
            left: bx,
            width: bw
          }
        },
        signup: {
          coords: {
            left: bx
          }
        }
=======
        time: dayjs(usr.created_at).toNow(true),
        perc: perc + '%'
>>>>>>> fix
      }

      const res1 = await fetch(process.env.REACT_APP_PRESENTA_SERVICE_URL, {
        method: 'POST',
        body: JSON.stringify(ob)
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      })

      const img = await res1.json()// .data
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
        <input placeholder='type a GitHub username' onKeyUp={handleKeyUp} ref={tfUsername} autoComplete='off' type='text' onChange={handleTyping} />
        <p>Confused? <span onClick={handleSample}>Use the sample</span> or just type something short randomly, <br />Github has nearly 100 Millions of users!</p>
        <button disabled={btnDisabled} onClick={handleGenerate}>{btnLabel}</button>

      </div>
    </div>
  )
}

export default Form
