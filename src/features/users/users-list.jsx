import { useSelector } from 'react-redux';
import { selectAllUsers, getUsersError, getUsersStatus } from './users.slice';

import CircledUserIcon from './circled-user-icon';

const UsersList = () => {
    const users = useSelector(selectAllUsers);
    const usersStatus = useSelector(getUsersStatus);
    const usersError = useSelector(getUsersError);

    let content;

    if (usersStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (usersStatus === 'succeeded' && users.length !== 0) {
        console.log('users length: ', users.length)

        content = users.flat().map(user => <CircledUserIcon key={user.email} user={user} />)
    } else if (usersStatus === 'failed') {
        content = <p>{ usersError }</p>
    } else if (users.length === 0) {
        content = <p>Nothing is here yet.</p>
    }

    return (
        <div className="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-12">

            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                <h2 className="text-2xl font-bold md:pt-8 md:text-4xl md:leading-tight dark:text-white">Our Writers</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Creative people</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
                { content }
            </div>
        </div>
    )
}

export default UsersList