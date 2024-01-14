import { useEffect, useRef, useState } from 'react'
import { eventBusService } from '../services/event-bus.service.js'
import { CheckIcon, CloseIcon } from './Icons.jsx'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      // window.scrollTo({top: 0, behavior: 'smooth'});
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type} flex space-between`}>
      <div className="left flex align-center gap8">

      <CheckIcon/>
      <span>{msg.txt}</span>
      </div>
      <div className="right flex align-center">
      <button className='' onClick={closeMsg}><CloseIcon/></button>
      </div>
    </section>
  )
}
