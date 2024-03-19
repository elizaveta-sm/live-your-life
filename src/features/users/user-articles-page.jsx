import { useParams } from "react-router-dom"
import { selectUserByEmail } from "./users.slice";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import ArticlesList from "../articles/articles-list";
import CircledUserIcon from './circled-user-icon';

const UserArticlesPage = () => {
    const routeParams = useParams();

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const currentUserEmail = cookies.Email;

    const selectedUser = useSelector((state) => selectUserByEmail(state, routeParams.userEmail));

    console.log(selectedUser)

    return (
        <div className="w-full flex items-center justify-center">
            <div className="mt-12 pt-12">
                <CircledUserIcon user={selectedUser} />
                <ArticlesList />
            </div>
        </div>
    )
}

export default UserArticlesPage