import { useSelector } from "react-redux";
import ArticlesExcerpt from "./articles-excerpt";
import { 
    selectAllArticles, 
    getArticlesStatus, 
    getArticlesError
} from "./articles.slice";

import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { selectUserByEmail } from "../users/users.slice";
import { selectArticleByUserEmail } from "./articles.slice";

import LoadingSpinner from "../../components/ui/loading-spinner.component";
import NoResults from '../../components/ui/no-results.component';

const ArticlesList = () => {
    const routeParams = useParams();
    const selectedUserEmail = routeParams.userEmail || '';

    const posts = useSelector(selectAllArticles);
    const postsStatus = useSelector(getArticlesStatus);
    const postsError = useSelector(getArticlesError);

    const selectedUser = useSelector((state) => selectUserByEmail(state, selectedUserEmail));

    const selectedUserPosts = useSelector((state) => selectArticleByUserEmail(state, selectedUserEmail));

    const hasSelectedUser = () => {
        if (typeof selectedUser !== 'undefined') {
            return true;
        }
        return false;
    };

    const location = useLocation();

    const category = hasSelectedUser() ? 'user' : location.pathname.slice(1);

    let articles; 

    if (category.length && category !== 'user') {
        articles = posts.filter(post => post.category === category);
    } else if (category === 'user') {
        articles = selectedUserPosts
    } else if (category.length === 0) {
        articles = posts;
    }

    let content;

    if (postsStatus === 'succeeded' && posts.length !== 0) {
        content = articles.map(article => <ArticlesExcerpt key={article.id} post={article} />)
    } else if (postsStatus === 'failed') {
        content = <p>{ postsError }</p>
    } else if (posts.length === 0) {
        content = <p>Nothing is here yet.</p>
    }

    return (
        <div className="articles list">
            <div className={`max-w-[85rem] px-4 py-10 ${hasSelectedUser() ? 'mt-0' : ''} sm:px-6 lg:px-8 lg:py-20 mx-auto`}>

                { hasSelectedUser() ? '' : (
                    <div className="max-w-2xl mx-auto text-center mb-10 mt-5 lg:mb-14">
                        <h2 className="text-3xl font-bold pt-10 md:text-4xl md:leading-tight dark:text-white underline decoration-purple-500/70 underline-offset-4">Our Blog</h2>
                        <p className="my-3 text-xl text-gray-600 dark:text-gray-400">Write your articles and spread them to the world.</p>

                        <Link className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-purple-300 text-sm text-purple-600 hover:text-purple-700 font-semibold hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:bg-slate-900 dark:border-purple-700 dark:hover:border-purple-600 dark:text-purple-600 dark:hover:text-purple-500 dark:hover:shadow-slate-700/[.7] dark:focus:ring-purple-700 dark:focus:ring-offset-purple-800" to='/users'>
                            Our Writers
                            <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </Link>

                    </div>
                ) }

                { postsStatus === 'loading' ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            { content }
                        </div>
                ) }

                { !articles.length && postsStatus === 'succeeded' ? (
                        <NoResults />
                    ) : '' }

            </div>
        </div>
    )
};

export default ArticlesList;