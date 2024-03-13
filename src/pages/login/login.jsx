import { ToastContext } from "../../context/toast.context";
import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { NOTIFICATION_TYPES } from "../../components/ui/notification.component";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCookies } from 'react-cookie';

import Button, { BUTTON_STYLE_TYPES } from "../../components/ui/button.component";
import Notification from '../../components/ui/notification.component';
import { useEffect, useState, useRef } from 'react';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';

const LOGIN_URL = `${import.meta.env.VITE_SERVERURL}/login`;


const Login = () => {
  const { setNotification } = useContext(ToastContext);

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(null);
  
  const emailRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  
  const [password, setPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [validation, setValidation] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');

    if (email && password) {
      setValidation(true)
    }
  }, [email, password]);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      LOGIN_URL, 
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const accessToken = response?.data?.token;

    if (accessToken) {
      setCookie('Email', response.data.email)
      setCookie('Username', response.data.userName)
      setCookie('ImageUrl', response.data.imageUrl)
  
      setEmail('');
      setPassword('');

      navigate('/');
      
      setNotification({
        message: 'You have been successfully logged in.',
        type: NOTIFICATION_TYPES.success,
        id: uuidv4(),
      });

      return;
    } 

    if (response.data.status === 400) {
      setErrorMessage(response.data.errorText);
    } else if (!response) {
      setErrorMessage('No server response')
    } else if (response.data === 'User does not exist') {
      setErrorMessage('User does not exist')
    } else {
      setNotification({
        message: 'Error has occurred. Please try logging in again.',
        type: NOTIFICATION_TYPES.danger,
        id: uuidv4(),
      });
    }
  } 

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state.success) {
        setIsOpen(true)
      }
    }
  }, [location]);

  const getIsOpen = (isOpen) => {
    setIsOpen(isOpen)
  };


  return (
    <div className="w-full h-full flex items-center justify-center">
      <main className="w-full max-w-md mx-auto p-6 ">
        { 
          isOpen ? ( 
            <Notification title='Success' content='Your account has been created' success={location.state?.success} getIsOpen={getIsOpen} /> 
          ) : ''
        }
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">

            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Login</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account yet?
                <Link className="text-purple-600 decoration-2 hover:underline font-medium ml-1.5" to='/register'>
                  Register here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div ref={errorRef} className={`${errorMessage ? '' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative flex justify-between items-center`} role="alert">
                  <strong className="font-bold text-sm">{errorMessage ? errorMessage : ''}</strong>
                  <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <form onSubmit={submitHandler}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email</label>
                    <div className="relative">
                      <input 
                        ref={emailRef}
                        onChange={emailChangeHandler} 
                        value={email}
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" aria-describedby="email-error"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)} 
                      />
                      <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                    </div>
                    <div className="relative">
                      <input 
                        onChange={passwordChangeHandler} 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="password-error" 
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                      />
                      <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                  </div>
                  <Button 
                    value='Login' 
                    validation={validation} 
                    buttonStyleType={BUTTON_STYLE_TYPES.base}
                    type='submit' 
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  )
}

export default Login;