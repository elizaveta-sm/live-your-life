# Full-Stack Blog App Using React, Node.js, Express, and PostgreSQL

> :speech_balloon: На русском:
> 
> [![Static Badge](https://img.shields.io/badge/lang-ru-%23e3242b)](https://github.com/elizaveta-sm/live-your-life/blob/main/README.ru.md)

> [!IMPORTANT]
> The app is **currently in production** on [Vercel](https://vercel.com). Feel free to **experience** the app **firsthand** by following the link: [Live Your Life](https://live-your-life.vercel.app/).


> [!WARNING]  
> **All users and articles** displayed on this website are created solely **for demonstration purposes and are NOT real**. Any resemblance to actual persons, living or dead, or real articles is purely coincidental. The content is generated to showcase the functionality of the website and doesn't represent real user data or articles. 


> [!NOTE]
> This repository consists of **solely the frontend part of the application**. If you'd like to see the **backend** code, you can follow the link: [Blog App Server](https://github.com/elizaveta-sm/blog-app-server).


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
      <ul>
        <li><a href="#key-features-include">Key Features Include</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#deployed-with">Deployed With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

&nbsp;

<!-- ABOUT THE PROJECT -->
## About the Project

<center>
  <img alt="blog app logo" src="./Images/blog-app-logo.png" height="175" />
</center>

:small_blue_diamond: *Live Your Life* :small_blue_diamond: is a full-stack blog application that leverages principles of **responsive and accessible web design**. **Made from scratch**, the app was intented to be a **learning tool** for me to gain hands-on experience and acquire new skills and knowldge in the process of its developement. 

&nbsp; 

### Key Features Include

:star: **Read and Sort Articles**: Explore a wide range of articles by the website's users and sort them by 6 distinct categories.  

:star: **Join :small_blue_diamond: *Live Your Life* :small_blue_diamond:**: Create a personalized account. 

:star: **Publish, Edit & Delete Articles**: Write compelling articles and share them with the world. Enjoy complete control over your content with options to edit and delete articles as needed. 

> See <a href="#usage">Usage</a> for detailed information.

&nbsp;

### Built With

:star: **Frontend**
* HTML, CSS, JavaScript 
* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind](https://tailwindcss.com/)
* [Redux Toolkit](https://redux-toolkit.js.org/)

:star: **Backend**
* JavaScript, SQL
* [Node.js](https://nodejs.org/en)
* [PostgreSQL](https://www.postgresql.org/)
* [Express.js](https://expressjs.com/)

&nbsp;

### Deployed With

:star: **Frontend and Server**: [Vercel](https://vercel.com/)

:star: **Database**: [Supabase](https://supabase.com/)

> See <a href="#acknowledgments">Acknowledgments</a> for more information.

&nbsp;

<!-- USAGE -->
## Usage

### :memo: Register Page
<img align="center" src="./Images/live-your-life_register.png" height="500" />

- Fill in the required fields with your credentials:
  - User name
  - Email address
  - Password

---

### :memo: Login Page
<img align="center" src="./Images/live-your-life_login.png" height="500" />

- Enter your email address and password to log in.

---

### :memo: Main Page
<img align="center" src="./Images/live-your-life_main-page.png" height="500" />

- You are redirected to the main page of the app after successful login.
- A notification appears in the bottom right corner confirming successful login.
- Your user name and default profile picture are displayed in the navigation bar.

---

### :memo: Profile Settings Page
<img align="center" src="./Images/live-your-life_edit-user-page.png" height="500" />

- Click on your username in the navigation bar to access your profile settings.
- Here, you can:
  - Change your profile picture by pasting the image URL.
  - Update your username.
  - Delete your profile entirely.

---

### :memo: Create Article Page
<img align="center" src="./Images/live-your-life_create-article.png" height="500" />

- Click on the "create" tab to create a new article.
- Fill in the required fields and press 'publish' to create the article.

---

### :memo: View Created Article on the Main Page
<img align="center" src="./Images/live-your-life_technology-articles.png" height="500" />

- After successfully creating the article, you can view it among articles written by other users.

---

### :memo: Edit/Delete Article Page
<img align="center" src="./Images/live-your-life_edit-article-page.png" height="500" />

- Click on the article you want to edit or delete.
- The fields are filled with the article's information.
- You can make changes or use the delete button to remove the article.

---

### :memo: Logout Confirmation Page
<img align="center" src="./Images/live-your-life_logout-page.png" height="500" />

- Confirm your decision to log out of your account.

&nbsp;

## License
Distributed under the MIT License. 
> See <a href="https://github.com/elizaveta-sm/live-your-life/blob/main/LICENSE.md">LICENSE.md</a> for more information.

&nbsp;

## Acknowledgments
 
:gem: [Preline](https://preline.co/)

:gem: [React Router](https://reactrouter.com/en/main)

:gem: [Axios](https://axios-http.com/)

:gem: [react-cookie](https://www.npmjs.com/package/react-cookie)

:gem: [uuid](https://www.npmjs.com/package/uuid)

:gem: [bcrypt](https://www.npmjs.com/package/bcrypt)

:gem: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

:gem: [Postgres.js](https://github.com/porsager/postgres)

:gem: [nodemon](https://www.npmjs.com/package/nodemon)
