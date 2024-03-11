import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllArticles, getArticlesError, getArticlesStatus, selectArticleById } from "./articles.slice";
import { selectAllUsers, getUsersStatus, getUsersError, selectUserByEmail } from "../users/users.slice";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const SingleArticlePage = () => {
    const posts = useSelector(selectAllArticles);
    const postsStatus = useSelector(getArticlesStatus);
    const postsError = useSelector(getArticlesError);

    const users = useSelector(selectAllUsers);
    const usersStatus = useSelector(getUsersStatus);
    const usersError = useSelector(getUsersError);

    const [author, setAuthor] = useState('');

    const routeParams = useParams();
    const { id } = routeParams;
    
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;

    const article = useSelector((state) => selectArticleById(state, id));
    
    const user = useSelector((state) => selectUserByEmail(state, article?.user_email));

    useEffect(() => {
        setAuthor(user)
    }, [user])
    
    let content;

    if (usersStatus === 'loading' || postsStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (usersStatus === 'error' || postsError === 'error') {
        content = <p>{usersError || postsError}</p>
    } else if (usersStatus === 'succeeded' || postsStatus === 'succeeded') {
        content = ''
    }

    if (!article) {
        return (
            <section>
                <h2 aria-label="article is not found">Article N😮t Found</h2>
            </section>
        )
    }

    return (
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mt-12 mx-auto lg:pt-14">
            <div className="grid lg:grid-cols-6 gap-y-8 lg:gap-y-0 lg:gap-x-6 lg:gap-x-12">
                <div className="lg:col-start-2 col-span-4">
                <div className="py-8 lg:pr-4 lg:pr-8">
                    <div className="space-y-5 lg:space-y-8">
                    <Link className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline dark:text-blue-400" to='/'>
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        Back to Articles
                    </Link>

                    { author ? (
                        <div className="py-5">
                            <div className="group flex items-center gap-x-3 pb-0">
                                <Link className="block flex-shrink-0" to={`/users/${author.email}`}>
                                    <div className='bg-cover bg-center w-10 h-10 rounded-full object-center mx-auto' style={{backgroundImage: `url(${author.image_url})`}} />
                                </Link>

                                <Link className="group grow block" to={`/users/${author.email}`}>
                                    <h5 className="group-hover:text-gray-600 text-sm font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                                        { author.user_name }
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                        { author.email }
                                    </p>
                                </Link>

                                { userEmail === author.email ? (
                                    <Link className="flex items-center gap-x-2 font-medium text-gray-500 hover:underline md:border-l md:border-gray-300 md:my-6 md:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:underline" to={`/${id}/edit-article`} state={{ id: id, mode: 'edit' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
                                    </Link>
                                ) : '' }
                                

                            </div>
                        </div>
                    ) : content }


                    <h2 className="text-3xl font-bold lg:text-4xl lg:text-5xl dark:text-white">{article.title}</h2>

                    <div className="flex items-center gap-x-5">
                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">{new Date(article.post_date).toLocaleDateString()}</p>
                    </div>

                    <figure>
                        <img className="w-full object-cover rounded-xl" src={`${article.image_url}`} alt="Image Description" />
                    </figure>

                    <div className="text-lg text-gray-800 dark:text-gray-200">
                        {article.content}
                    </div>

                    </div>  
                    </div>
                </div>

                
            </div>
        </div>
  )
}

export default SingleArticlePage;