import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContext } from "../../context/toast.context";
import { NOTIFICATION_TYPES } from "../../components/ui/notification.component";
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';

import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button, { BUTTON_STYLE_TYPES } from "../../components/ui/button.component";
import { UserContext } from "../../context/user.context";

const REGISTER_URL = `${import.meta.env.VITE_APP_SERVERURL}/register`;

const USER_REGEX = /(.*[a-z]){3}/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const IMAGE_URL = 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png';

const Register = () => {
  const { setNotification } = useContext(ToastContext);
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [validUsername, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatchPwd, setValidMatchPwd] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      usernameRef.current.focus();
  }, []);

  useEffect(() => {
      const result = USER_REGEX.test(username);
      setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
        setErrorMessage('');
  }, [username, email, password, matchPwd]);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  }

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const pwdMatchChangeHandler = (e) => {
    setMatchPwd(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
        setErrorMessage("Invalid Entry");
        return;
    }
    
    const match = password === matchPwd;

    if (!match) {
      setErrorMessage('Passwords do not match')
      return;
    }

    setValidMatchPwd(password === matchPwd);

    if (validUsername && email && validPassword && match) {
      const response = await axios.post(
        REGISTER_URL, 
        { username, email, password, IMAGE_URL },
        {
            headers: { 'Content-Type': 'application/json' }
        }
      )

      if (response.data.code === '23505') {
        setErrorMessage('Email already exists')
      } else if (!response) {
        setErrorMessage('No server response')
      } else if (response.data.status === 500) {
        setNotification({
          message: response.data.errorText,
          type: NOTIFICATION_TYPES.danger,
          id: uuidv4(),
        })
      } else if (response.data.status === 200) {
        setCurrentUser({
          username, 
          email, 
          IMAGE_URL
        });
        navigate('/login');
      
        setNotification({
          message: 'You have been successfully registered.',
          type: NOTIFICATION_TYPES.success,
          id: uuidv4(),
        });

        return;
      } else {
        setNotification({
          message: 'Error has occured. Please try again.',
          type: NOTIFICATION_TYPES.danger,
          id: uuidv4(),
        })
      }
    } 

  }

  return (
    <div className="w-full h-full flex items-center justify-center">
    <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Register</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Already have an account?
                <Link className="text-purple-600 ml-1.5 decoration-2 hover:underline font-medium" to='/login'>
                  Login here
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
                    <label htmlFor="name" className="block text-sm mb-2 dark:text-white">
                      Name
                      <FontAwesomeIcon icon={faCheck} className={`${validUsername ? "text-teal-500" : "hidden"} ml-1.5`} />
                      <FontAwesomeIcon icon={faTimes} className={`${validUsername || !username ? "hidden" : "text-red-500"} ml-1.5`} />
                    </label>
                    <div className="relative">
                      <input 
                        ref={usernameRef} 
                        autoComplete="off" 
                        onChange={usernameChangeHandler} 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={username}
                        aria-invalid={validUsername ? "false" : "true"}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" 
                        required 
                        aria-describedby="uidnote"
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                      />

                      <div className={`${validUsername || !username ? 'hidden' : ''} absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3`}>
                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                      </div>

                    </div>

                    <div className={`${usernameFocus && username && !validUsername ? '' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-3 text-sm rounded relative`} role="alert">
                      <strong className="font-bold">{validUsername ? '' : 'Invalid Username'}</strong>
                      <p id="uidnote">
                        At least 3 letters.<br />
                      </p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                      Email address
                    </label>
                    <div className="relative">
                      <input 
                        onChange={emailChangeHandler} 
                        type="email" 
                        id="email" 
                        name="email"
                        value={email}
                        autoComplete="off"
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" 
                        required 
                        aria-invalid={email ? "false" : "true"}
                        aria-describedby="email-error" 
                      />
                      <div className='hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3'>
                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                      Password
                      <FontAwesomeIcon icon={faCheck} className={`${validPassword ? "text-teal-500" : "hidden"} ml-1.5`} />
                      <FontAwesomeIcon icon={faTimes} className={`${validPassword || !password ? "hidden" : "text-red-500"} ml-1.5`} />
                    </label>
                    <div className="relative">
                      <input 
                        onChange={passwordChangeHandler} 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" 
                        required 
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote" 
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

                    <div className={`${passwordFocus && password && !validPassword ? '' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-3 text-sm rounded relative`} role="alert">
                      <strong className="font-bold">{validUsername ? '' : 'Invalid Password'}</strong>
                      <p id="pwdnote">
                        Must contain at least 1 lowercase and 1 uppercase letter.<br />
                        At least 1 number.<br />
                        At least one special character:
                        <span aria-label="exclamation mark"> ! </span> <span aria-label="at symbol">@ </span>
                        <span aria-label="hashtag"># </span> 
                        <span aria-label="dollar sign">$ </span> 
                        <span aria-label="percent">% </span>
                        <span aria-label="caret">^ </span>
                        <span aria-label="ampersand">& </span>
                        <span aria-label="star">* </span>.<br />
                        Must be 8 characters or longer.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm mb-2 dark:text-white">Confirm Password</label>
                    <div className="relative">
                      <input onChange={pwdMatchChangeHandler} type="password" id="confirm-password" name="confirm-password" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="confirm-password-error" />
                      <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="hidden text-xs text-red-600 mt-2" id="confirm-password-error">Password does not match the password</p>
                  </div>

                  <Button 
                    value='Register' 
                    validation={validUsername || validPassword || validMatchPwd}
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

export default Register;