import { Routes, Route } from 'react-router-dom';

import Navigation from './pages/navigation/navigation';
import Login from './pages/login/login';
import Register from './pages/register/register';
import CreateArticleForm from './features/articles/create-article-form';
import Footer from './pages/footer/footer';
import UpdateUserProfile from './pages/update-user-profile/update-user-profile';
import SingleArticlePage from './features/articles/single-article-page';
import ArticlesList from './features/articles/articles-list';
import UsersList from './features/users/users-list';
import UserArticlesPage from './features/users/user-articles-page';
import NotFoundError from './pages/not-found-error/not-found-error';
import LogoutConfirmation from './pages/logout/logout-confirmation';
import DeleteConfirmation from './pages/delete/delete-confirmation';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='*' element={<NotFoundError />} />
        <Route index element={<ArticlesList />} />
        <Route path='/' element={<Footer />} /> 
        <Route path='/users' element={<UsersList />} /> 
        <Route path='/users/:userEmail' element={<UserArticlesPage />} /> 
        <Route path='/update-profile' element={<UpdateUserProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<LogoutConfirmation />} />
        <Route path='/delete-account' element={<DeleteConfirmation />} />
        <Route path='/delete-article' element={<DeleteConfirmation />} />
        <Route path='/:id' element={<SingleArticlePage />} />
        <Route path='art/:id' element={<SingleArticlePage />} />
        <Route path='science/:id' element={<SingleArticlePage />} />
        <Route path='technology/:id' element={<SingleArticlePage />} />
        <Route path='cinema/:id' element={<SingleArticlePage />} />
        <Route path='design/:id' element={<SingleArticlePage />} />
        <Route path='food/:id' element={<SingleArticlePage />} />
        <Route path='/create-article' element={<CreateArticleForm />} />
        <Route path='/:id/edit-article' element={<CreateArticleForm />} />
        <Route path='users/:userEmail/:id/edit-article' element={<CreateArticleForm />} />
        <Route path='/art' element={<ArticlesList />} />
        <Route path='/science' element={<ArticlesList />} />
        <Route path='/technology' element={<ArticlesList />} />
        <Route path='/cinema' element={<ArticlesList />} />
        <Route path='/design' element={<ArticlesList />} />
        <Route path='/food' element={<ArticlesList />} />
      </Route>
    </Routes>
  )
}

export default App;