import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectAllUsers, getUsersStatus, getUsersError } from "../users/users.slice";

const ArticlesExcerpt = ({ post }) => {

  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(getUsersStatus);
  const usersError = useSelector(getUsersError);

  let content;

  if (usersStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (usersStatus === 'error') {
    content = <p>{usersError}</p>
  }

  const author = users?.flat().filter(user => user.email === post.user_email);

  return (
    <Link key={post.id} className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4]" to={`/${post.id}`}>
      <div className="aspect-w-16 aspect-h-11">
          <img className="w-full object-cover rounded-xl" src={post.image_url} alt="Image Description" />
      </div>
      <div className="my-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
          {post.title}
          </h3>
          <p className="mt-5 text-gray-600 dark:text-gray-400">
              {`${post.content.substring(0,100)}...`}
          </p>
      </div>
      { author.length ? (
        <div className="mt-auto flex items-center gap-x-3">
            <img className="w-8 h-8 rounded-full" src={author[0].image_url} alt="Image Description" />
            <div>
              <h5 className="text-sm text-gray-800 dark:text-gray-200">By {author[0].user_name}</h5>
            </div>
        </div>
      ) : content }
    </Link>
  )
}

export default ArticlesExcerpt;