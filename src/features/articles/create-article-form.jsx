import { useCookies } from 'react-cookie';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { addNewPost, editPost, fetchPosts, selectArticleById } from "./articles.slice";
import { getArticlesStatus } from './articles.slice';

import Button, { BUTTON_STYLE_TYPES } from "../../components/ui/button.component";
import { NOTIFICATION_TYPES } from '../../components/ui/notification.component';
import LoadingSpinner from '../../components/ui/loading-spinner.component';

import { ToastContext } from '../../context/toast.context';
import { UserContext } from '../../context/user.context';

const INITIAL_STATE = {
    title: '',
    content: '',
    post_date: '',
    category: '',
    image_url: '',
};

const CreateArticleForm = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const location = useLocation();
    
    const { setNotification } = useContext(ToastContext);
    const { currentUser, setCurrentUser } = useContext(UserContext); 
    
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [editDataIsFull, setEditDataIsFull] = useState(false);

    const postsStatus = useSelector(getArticlesStatus);
    
    const [cookies] = useCookies(null);

    const userEmail = currentUser ? currentUser.email 
        : (cookies.Email !== 'undefined' && typeof(cookies.Email) !== 'undefined') ?  cookies.Email
        : '';
    
    const id = location.state?.id;
    
    const article = useSelector((state) => selectArticleById(state, id));
    
    const mode = location.state?.mode ? location.state.mode : 'create';

    const [createData, setCreateData] = useState({
        ...INITIAL_STATE,
        user_email: userEmail,
    });

    const [editData, setEditData] = useState({
        ...INITIAL_STATE,
        user_email: userEmail,
    });

    useEffect(() => {
        if (mode === 'create') {
            return;
        }

        const arrayOfValues = Object.values(editData);

        arrayOfValues.map((value, index) => {
            if (value === '' && index === 3) {
                setEditDataIsFull(true)
            } else {
                setEditDataIsFull(true)
            }
        });

    }, [postsStatus, isFirstLoad]);

    useEffect(() => {
        if (isFirstLoad && mode === 'edit' && postsStatus === 'succeeded') {

            setEditData({
                ...editData,
                title: article.title,
                content: article.content,
                post_date: article.post_date,
                category: article.category,
                image_url: article.image_url,
            });

            setFirstLoad(false);
        }

    }, [isFirstLoad, postsStatus]);

    useEffect(() => {
        if (mode === 'edit') {
            return;
        }

        if (createData.category.length > 15) {

            setCreateData({
                ...createData,
                category: '',
            })
        }
    }, [createData.category, createData]);

    useEffect(() => {
        if (mode === 'create') {
            return;
        }

        if (editData.category.length > 15) {
            setEditData({
                ...editData,
                category: '',
            })
        }
    }, [editData.category, editData]);

    const [requestStatus, setRequestStatus] = useState('idle')
    
    const canSaveCreate = [createData.title, createData.content].every(Boolean) && requestStatus === 'idle';
    const canSaveEdit = [editData.title, editData.content].every(Boolean);

    const onPublishArticleClicked = (e) => {
        e.preventDefault();

        if (!userEmail) {
            navigateTo('/login');
            
            setNotification({
                message: 'You need to login first.',
                type: NOTIFICATION_TYPES.warning,
                id: uuidv4(),
            });
            setCreateData(INITIAL_STATE);
            return;
        }

        // * creating an article
        if (canSaveCreate && mode === 'create') {
            try {
                setRequestStatus('pending');
                dispatch(addNewPost(createData))
                    .unwrap()
                    .then((response) => {
                        if (response.status === 200) {
                            setCreateData(INITIAL_STATE);

                            navigateTo('/');
                            window.location.reload(true);

                            setNotification({
                                message: 'Article has been successfully created.',
                                type: NOTIFICATION_TYPES.success,
                                id: uuidv4(),
                            });
                        }
                    })
                    .catch((error) => {
                        setNotification({
                            message: `Error has occurred: ${error}. Please try again later.`,
                            type: NOTIFICATION_TYPES.danger,
                            id: uuidv4(),
                        })
                    });
            } catch (err) {
                setNotification({
                    message: `Error has occurred: ${err}. Please try again later.`,
                    type: NOTIFICATION_TYPES.danger,
                    id: uuidv4(),
                })
            } finally {
                setRequestStatus('idle')
            }
        } 
        
        // * editing an article
        else if (canSaveEdit && mode === 'edit') {
            try {
                dispatch(editPost({editData, id}))
                    .unwrap()
                    .then(response => {
                        if (response.status === 200) {
                            setEditData(INITIAL_STATE);

                            navigateTo('/');
                            window.location.reload(true); 
        
                            setCurrentUser({
                                email: cookies.Email,
                                username: cookies.Username,
                                imageUrl: cookies.ImageUrl,
                            });
                            
                            setNotification({
                                message: 'Your changes to the article have been successfully saved.',
                                type: NOTIFICATION_TYPES.success,
                                id: uuidv4(),
                            });
                        }
                    })
                    .catch(error => {
                        setNotification({
                            message: `Error has occurred: ${error.message}.`,
                            type: NOTIFICATION_TYPES.danger,
                            id: uuidv4(),
                        })
                    })
            } catch (error) {
                setNotification({
                    message: `Error has occurred: ${error}. Please try again later.`,
                    type: NOTIFICATION_TYPES.danger,
                    id: uuidv4(),
                })
            } 
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;

        if (mode === 'create') {
            setCreateData(data => ({
              ...data,
              category: value.toLowerCase(),
              post_date: new Date().toISOString(),
              [name] : value
            }));
        } else if (mode === 'edit') {
            setEditData(data => ({
              ...data,
              category: value.toLowerCase(),
              post_date: new Date().toISOString(),
              [name] : value
            }));
        }
    
    };
    
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-full'>
                { postsStatus === 'succeeded' && (mode === 'create' || (mode === 'edit' && editDataIsFull)) ? (
                    <div className="max-w-4xl px-4 py-10 mt-12 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        <form onSubmit={onPublishArticleClicked}>
                        <div className="bg-white rounded-xl dark:bg-slate-900">
                            <div className="p-4 sm:pt-0 sm:p-7">
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {`${mode[0].toUpperCase() + mode.slice(1)} Article`}
                                </h2>
                                
                                <div className="space-y-2">
                                <label htmlFor="af-submit-app-project-name" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                    Article Title
                                </label>
                
                                <input name="title" onChange={changeHandler} value={mode === 'create' ? createData.title : mode === 'edit' ? editData.title : ''} id="af-submit-app-project-name" type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter title" />
                                </div>
                
                                <div className="space-y-2">
                                <label htmlFor="af-submit-project-url" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                    Image URL
                                </label>
                
                                <input autoComplete='off' name="image_url" onChange={changeHandler} value={mode === 'create' ? createData.image_url : mode === 'edit' ? editData.image_url : ''} id="af-submit-project-url" type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="https://example.so" />
                                </div>
                
                                <div className="space-y-2">
                                <label htmlFor="af-submit-app-description" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                    Content
                                </label>
                
                                <textarea name="content" onChange={changeHandler} value={mode === 'create' ? createData.content : mode === 'edit' ? editData.content : ''} id="af-submit-app-description" className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows="6" placeholder="Did you know that users spend an average of 5.59 seconds looking at written content on a website?"></textarea>
                                </div>
                
                
                                <div className="space-y-2">
                                <label htmlFor="af-submit-app-category" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                                    Category
                                </label>
                
                                <select name="category" onChange={changeHandler}  id="af-submit-app-category" className="txt-select py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                    <option disabled defaultValue value=''>Select a category</option>
                                    <option value='art'>Art</option>
                                    <option value='science'>Science</option>
                                    <option value='technology'>Technology</option>
                                    <option value='cinema'>Cinema</option>
                                    <option value='design'>Design</option>
                                    <option value='food'>Food</option>
                                </select>
                                </div>
                
                            </div>
                
                            <div className="mt-5 flex justify-end gap-x-2">
                                {  mode === 'edit' ? (
                                        <Link className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" to='/delete-article' state={{ articleId: id }}>
                                            Delete
                                        </Link>
                                    ) : '' }
                                    
                                <Button 
                                    value='Publish' 
                                    validation={canSaveCreate || canSaveEdit}
                                    buttonStyleType={BUTTON_STYLE_TYPES.confirm}
                                    type='submit' 
                                />
                            </div>
                            </div>
                        </div>
                    </form>
                </div> ) : (
                    <LoadingSpinner />
                ) }
            </div>
        </div>
    )
}

export default CreateArticleForm;