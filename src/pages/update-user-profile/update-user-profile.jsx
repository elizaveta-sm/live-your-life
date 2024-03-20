import { useCookies } from 'react-cookie';
import { useEffect, useState, useRef, useContext } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

import Button, {BUTTON_STYLE_TYPES} from '../../components/ui/button.component';

import { fetchUsers } from '../../features/users/users.slice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { ToastContext } from '../../context/toast.context';
import { NOTIFICATION_TYPES } from '../../components/ui/notification.component';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UserContext, UserProvider } from '../../context/user.context';

const USER_REGEX = /(.*[a-z]){3}/i;
const UPDATE_PROFILE_URL = `${import.meta.env.VITE_APP_SERVERURL}/update-profile`;

const IMAGE_URL = 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png';

const UpdateUserProfile = () => {
  const { setNotification } = useContext(ToastContext);
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cookies, setCookie ] = useCookies(null);

  const userEmail = cookies.Email;
  const userNameInCookies = cookies.Username;

  const imageUrl = cookies.ImageUrl;

  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [validUsername, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [inputImageUrl, setInputImageUrl] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const urlChangeHandler = (e) => {
    setInputImageUrl(e.target.value)
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    let result;

    if (!username) {
      result = true; 
    } else {
      result = USER_REGEX.test(username);
    }

    setValidName(result);
  }, [username]);

  useEffect(() => {
    setErrorMessage('');
  }, [username, inputImageUrl]);
  

  const cancelHandler = () => {
    setInputImageUrl('');
    setUsername('');

    navigate('/');
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();

    const validation = username ? USER_REGEX.test(username) : true;

    if (!validation) {
      setErrorMessage("Invalid Entry");

      return;
    }

    if (validUsername || !username) {

      const image = inputImageUrl || imageUrl ? inputImageUrl || imageUrl : IMAGE_URL;

      const name = validUsername && username ? username : userNameInCookies;

      const response = await axios.put(
        UPDATE_PROFILE_URL, 
        { name, userEmail, image },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      console.log('response in the update user-profile: ', response)

      if (response.status === 200) {

        setCookie('Username', name)
        setCookie('ImageUrl', image)

        setCurrentUser({
          email: userEmail,
          username: name,
          imageUrl: image,
        });

        setUsername('');
        setInputImageUrl('');

        navigate('/');

        dispatch(fetchUsers());

        setNotification({
          message: 'Your changes have been successfully saved.',
          type: NOTIFICATION_TYPES.success,
          id: uuidv4(),
        });

      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
    <div className="w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl p-4 sm:p-7 dark:bg-slate-900">

        <div className='mb-8'>
          <NavLink className="hs-collapse-toggle font-medium text-gray-500 hover:underline lg:py-6 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to={`/users/${userEmail}`}>My Articles</NavLink>
        </div>

        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Profile
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your name and profile photo.
            </p>
        </div>

        <div id='avatar' className="flex items-center gap-5">
          <div className='bg-cover bg-center w-24 h-24 rounded-full object-center' style={{backgroundImage: `url(${imageUrl})`}} />
        </div>

        <div className="mt-5">

          <div ref={errorRef} className={`${errorMessage ? '' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative flex justify-between items-center`} role="alert">
            <strong className="font-bold text-sm">{errorMessage ? errorMessage : ''}</strong>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>

        <form onSubmit={submitHandler}>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">

            <div className="sm:col-span-12">

              <label htmlFor='af-account-image-url' className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                Profile photo URL
              </label>

              <input id="af-account-image-url" type="text" className="py-2 px-3 pr-11 mt-1 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder='https://example.com/profile-picture.jpg' autoComplete='off' onChange={urlChangeHandler} value={inputImageUrl} />
            </div>

            <div className="sm:col-span-12">
              <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                Name
                      <FontAwesomeIcon icon={faCheck} className={`${validUsername ? "text-teal-500" : "hidden"} ml-1.5`} />
                      <FontAwesomeIcon icon={faTimes} className={`${validUsername || !username ? "hidden" : "text-red-500"} ml-1.5`} />
              </label>
              
              <div className="sm:col-span-9">

                <input 
                  id="af-account-name" 
                  type="text" 
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" 
                  placeholder={`${userNameInCookies ? userNameInCookies : 'Alex Wallace'}`} 
                  ref={usernameRef} 
                  autoComplete="off" 
                  onChange={usernameChangeHandler}  
                  aria-invalid={validUsername ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() => setUsernameFocus(false)}
                />

                <div className={`${usernameFocus && username && !validUsername ? '' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-3 text-sm rounded relative`} role="alert">
                <strong className="font-bold">{validUsername ? '' : 'Invalid Username'}</strong>
                <p id="uidnote">
                  At least 3 letters.<br />
                </p>
              </div>

              </div>

            </div>

          </div>


          <div className="mt-5 flex justify-end gap-x-2">
            <Link className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" to='/delete-account'>
              Delete
            </Link>

            <Button 
              value='Cancel' 
              validation={true}
              buttonStyleType={BUTTON_STYLE_TYPES.cancel}
              type='button'
              onClick={cancelHandler}
            />

            <Button 
              value='Save Changes' 
              validation={validUsername}
              buttonStyleType={BUTTON_STYLE_TYPES.confirm}
              type='submit'
            />

          </div>
        </form>
      </div>
      </div>

      
      </div>
    </div>
  )
};

export default UpdateUserProfile;