import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import Button, { BUTTON_STYLE_TYPES } from "../../components/ui/button.component";
import { useContext } from "react";
import { ToastContext } from "../../context/toast.context";
import { NOTIFICATION_TYPES } from '../../components/ui/notification.component';

import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../context/user.context";

const DELETE_USER_URL = `${import.meta.env.VITE_APP_SERVERURL}/delete-profile`;
const DELETE_ARTICLE_URL = `${import.meta.env.VITE_APP_SERVERURL}/delete-post`;

const DeleteConfirmation = ({ state }) => {
    const { setNotification } = useContext(ToastContext);
    const { setCurrentUser } = useContext(UserContext);

    const notificationHandler = () => {
        setNotification({
            message: 'Article has been successfully deleted.',
            type: NOTIFICATION_TYPES.success,
            id: uuidv4(),
        });
    }

    const location = useLocation();
    const pathname = location.pathname;

    const articleMode = pathname === '/delete-article' ? true : false;
    
    const articleId = location.state?.articleId;

    const navigate = useNavigate();
    
    const [cookies, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;

    const deleteHandler = async () => {

        // * deleting an article
        if (articleMode) {
            try {
                const response = await axios.delete(
                    `${DELETE_ARTICLE_URL}/${articleId}`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    },
                );
    
                if (response.status === 200) {
                    navigate('/');
                    window.location.reload(true);
    
                    notificationHandler();
                }
            } catch (error) {
                setNotification({
                    message: `Error has occurred: ${error}. Please try again later.`,
                    type: NOTIFICATION_TYPES.danger,
                    id: uuidv4(),
                });
            }
            return;
        }

        // * deleting a user
        try {
            const response = await axios.delete(
                `${DELETE_USER_URL}/${userEmail}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
    
            if (response.status === 200) {
                removeCookie('Username');
                removeCookie('Email');
                removeCookie('ImageUrl');

                setCurrentUser(null);
    
                navigate('/');
    
                setNotification({
                    message: 'User has been successfully deleted.',
                    type: NOTIFICATION_TYPES.success,
                    id: uuidv4(),
                });
            } 
        } catch (error) {
            setNotification({
                message: `Error has occurred: ${error}. Please try again later.`,
                type: NOTIFICATION_TYPES.danger,
                id: uuidv4(),
            });
        }

    };

    const cancelHandler = () => {
        navigate(-1);
    }
    
    if (Object.keys(cookies).length === 0) {
        return;
    }

    return (
        
        <div id="hs-danger-alert" className="mt-12 pt-12 hs-overlay w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center">

            <div className="relative flex flex-col bg-white rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            

            <div className="p-4 sm:p-10 overflow-y-auto">
                <div className="flex gap-x-4 md:gap-x-7">
            
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                </span>

                <div className="grow">
                    <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                    Delete {articleMode ? 'Article' : 'Personal Account'} 
                    </h3>
                    <p className="text-gray-500">
                    Permanently remove your <span className="font-semibold">{articleMode ? 'article' : 'personal account'}</span> from <span className="italic">Live Your Life</span>. This action is not reversible. { articleMode ? '' : (
                        <span>
                            Please note that your written articles will <span className="font-semibold">NOT</span> be deleted. 
                        </span>
                    ) }
                    </p>
                </div>
                </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-white dark:bg-gray-800 dark:border-gray-700">
                <button onClick={cancelHandler} type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-danger-alert">
                    Cancel
                </button>

                <Button 
                    onClick={deleteHandler} 
                    value='Delete' 
                    validation={true}
                    buttonStyleType={BUTTON_STYLE_TYPES.delete}
                    type='button' 
                />

            </div>
            </div>
        </div>

    )
}

export default DeleteConfirmation;