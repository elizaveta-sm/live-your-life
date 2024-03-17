import Button, { BUTTON_STYLE_TYPES } from "../../components/ui/button.component";

import { ToastContext } from "../../context/toast.context";
import { NOTIFICATION_TYPES } from "../../components/ui/notification.component";
import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Logout = () => {
    const { setNotification } = useContext(ToastContext);

    const navigate = useNavigate();
    
    const [cookies, removeCookie] = useCookies(null);
    
    const logoutHandler = (e) => {
        e.preventDefault();
        
        removeCookie('Username');
        removeCookie('Email');
        removeCookie('ImageUrl');
    };

    const cancelHandler = () => {
        navigate(-1);
    };
      
    if (!cookies.Username && !cookies.Email && !cookies.ImageUrl) {
        navigate('/');

        setNotification({
            message: 'You have been successfully logged out.',
            type: NOTIFICATION_TYPES.success,
            id: uuidv4(),
        });
    }

    return (
        <div id="hs-sign-out-alert" className="hs-overlay w-full h-full flex items-center justify-center overflow-y-auto">
                <div className="relative flex flex-col bg-white rounded-xl dark:bg-gray-800">

                <form onSubmit={logoutHandler} className="p-4 sm:p-10 text-center overflow-y-auto">
                    
                    <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    </span>
                    

                    <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Log out
                    </h3>
                    <p className="text-gray-500">
                    Are you sure you would like to log out of your account?
                    </p>

                    <div className="mt-6 flex justify-center gap-x-4">
                        <Button 
                            value='Logout'
                            validation={true}
                            buttonStyleType={BUTTON_STYLE_TYPES.confirm}
                            type='submit'
                        />

                        <Button 
                            onClick={cancelHandler}
                            value='Cancel' 
                            validation={true}
                            buttonStyleType={BUTTON_STYLE_TYPES.cancel}
                            type='button'
                        />
                    </div>
                </form>
                </div>
            </div>
    )
}

export default Logout