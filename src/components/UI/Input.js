import React,{ useRef, useImperativeHandle } from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
  const inputRef=useRef()

  const activate = () => {
    inputRef.current.focus();
  }

  useImperativeHandle(ref,()=>{
    return {
      focus: activate
    }
  })

  // useEffect(()=>{
  //   inputRef.current.focus()
  // },[])
  return (
    <div>        <div
    className={`${classes.control} ${
      props.emailIsValid === false ? classes.invalid : ''
    }`}
  >
    <label htmlFor="email">{props.label}</label>
    <input
      ref={ref}
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  </div></div>
  )
})

export default Input;