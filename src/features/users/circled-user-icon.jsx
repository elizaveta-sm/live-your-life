import { Link } from "react-router-dom"

const CircledUserIcon = ({ user }) => {

    return (
        <Link className="text-center mt-4" to={`/users/${user.email}`}>
            <div className='bg-cover bg-center w-32 h-32 rounded-full object-center mx-auto' style={{backgroundImage: `url(${user.image_url})`}} />
            <div className="mt-2 sm:mt-4">
                <h3 className="font-medium text-black dark:text-white">
                    {user.user_name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                </p>
            </div>
        </Link>
    )
}

export default CircledUserIcon;