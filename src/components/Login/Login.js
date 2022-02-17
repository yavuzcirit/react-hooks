import React, { useState ,useContext, useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useEffect } from 'react/cjs/react.development';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const ctx = useContext(AuthContext)

  const emailInputRef=useRef()
  const passwordInputRef=useRef()

  useEffect(()=>{
    console.log('Effect Running')

    return () => {
      console.log('Effect Cleanup')
    }
  },[])

  useEffect(() => {
    const identifier = setTimeout(()=>{
    console.log("Checking for validity")
    setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      )
   },2000)

    return () => {
      console.log('Clean Up!')
      clearTimeout(identifier)
    }
  }, [enteredEmail,enteredPassword])
  

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6 && enteredPassword==="yavuzcirit23")
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(enteredEmail, enteredPassword);
    } else if(!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} id="email" label="E-mail" type="email" isValid={emailIsValid} value={enteredEmail} onChange={emailChangeHandler} onBLur={validateEmailHandler}/>
        <Input ref={passwordInputRef} id="password" label="Password" type="password" isValid={passwordIsValid} value={enteredPassword} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
