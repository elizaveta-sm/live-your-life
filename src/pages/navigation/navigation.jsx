'use client';

import { useCookies } from "react-cookie";

import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import Footer from '../footer/footer';
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    console.log('the current user is: ', currentUser)
    // ! if current user -> show the icon

    const [cookies] = useCookies(null);

    console.log('cookies: ', cookies);

    const userEmail = currentUser?.email || '';
    const userName = currentUser?.username || '';
    const imageUrl = currentUser?.IMAGE_URL || '';

    console.log('user email in the cookies in the navigation: ', userEmail)

    return (
      <>
        <header className="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full fixed top-0 left-0 bg-white border-b border-gray-200 text-sm md:text-base py-3 lg:py-0 dark:bg-gray-800 dark:border-gray-700">
          <nav className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-6 lg:flex lg:items-center lg:justify-between lg:px-8" aria-label="Global">
            <div className="flex items-center justify-between">
              <Link className="flex-none text-xl font-semibold dark:text-white" to='/' aria-label="Brand">Live Your Life</Link>
              <div className="lg:hidden">
                <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-purple-500 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                  <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                  <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div id="navbar-collapse-with-animation" className="hs-collapse-toggle hidden overflow-hidden transition-all duration-300 basis-full grow lg:block">
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 mb-2 lg:flex-row lg:items-center lg:justify-end lg:gap-y-0 lg:gap-x-7 lg:mt-0 lg:pl-7">
                <NavLink className="hs-collapse-toggle font-medium text-gray-500 hover:underline lg:py-6 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/art' style={({isActive}) => ({
                  color: isActive ? '#a855f7' : '#64748b'
                })}>Art</NavLink>
                <NavLink className="hs-collapse-toggle font-medium text-gray-500 hover:underline lg:py-6 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/science' style={({isActive}) => ({
                  color: isActive ? '#a855f7' : '#64748b'
                })}>Science</NavLink>
                <NavLink className="hs-collapse-toggle font-medium text-gray-500 hover:underline lg:py-6 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/technology' style={({isActive}) => ({
                  color: isActive ? '#a855f7' : '#64748b'
                })}>Technology</NavLink>
                <NavLink className="hs-collapse-toggle font-medium text-gray-500 hover:underline lg:py-6 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/cinema' style={({isActive}) => ({
                  color: isActive ? '#a855f7' : '#64748b'
                })}>Cinema</NavLink>
                <NavLink className="hs-collapse-toggle font-medium text-gray-500 hover:underline lg:py-6 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/design' style={({isActive}) => ({
                  color: isActive ? '#a855f7' : '#64748b'
                })}>Design</NavLink >
                <NavLink className="hs-collapse-toggle font-medium text-gray-500 hover:underline lg:py-6 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/food' style={({isActive}) => ({
                  color: isActive ? '#a855f7' : '#64748b'
                })}>Food</NavLink>

                {
                  currentUser !== null ? (
                    <>
                      <NavLink className="hs-collapse-toggle flex items-center gap-x-2 font-medium text-gray-500 hover:underline lg:border-l lg:border-gray-300 lg:my-6 lg:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/update-profile' style={({isActive}) => ({
                        color: isActive ? '#a855f7' : '#64748b'
                      })}>
                        <div className='bg-cover bg-center w-6 h-6 rounded-full object-center' style={{backgroundImage: `url(${imageUrl})`}} />
                        { userName }
                      </NavLink>

                      <NavLink className="hs-collapse-toggle flex items-center gap-x-2 font-medium text-gray-500 hover:underline lg:border-l lg:border-gray-300 lg:my-6 lg:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/logout' style={({isActive}) => ({
                        color: isActive ? '#a855f7' : '#64748b'
                      })} >
                        <svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                          <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"/>
                        </svg>
                        Logout
                      </NavLink>
                    </>
                  ) : (
                    <NavLink className="hs-collapse-toggle flex items-center gap-x-2 font-medium text-gray-500 hover:underline lg:border-l lg:border-gray-300 lg:my-6 lg:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/login' style={({isActive}) => ({
                      color: isActive ? '#a855f7' : '#64748b'
                    })} >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                      </svg>
                      Login
                    </NavLink>
                  )
                }


                <NavLink className="hs-collapse-toggle flex items-center gap-x-2 font-medium text-gray-500 hover:underline lg:border-l lg:border-gray-300 lg:my-6 lg:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:underline" data-hs-collapse="#navbar-collapse-with-animation" to='/create-article' style={({isActive}) => ({
                  color: isActive ? '#a855f7' : '#64748b'
                })}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
                  Create
                </NavLink>
              </div>
            </div>
          </nav>
        </header>
        <Outlet /> 
        <Footer />
      </>
    ) 
}


export default Navigation;