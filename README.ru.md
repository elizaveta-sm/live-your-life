# Веб-приложение для блога полного стека с использованием React, Node.js, Express, и PostgreSQL

[![Static Badge](https://img.shields.io/badge/lang-en-%23528aae)](https://github.com/elizaveta-sm/live-your-life)

> [!IMPORTANT]
> Веб-приложение **выложено в интернет** с помощью [Vercel](https://vercel.com) и в настоящее время **доступно для пользователей**. **Протестируйте** приложение самостоятельно, перейдя по ссылке: [Live Your Life](https://live-your-life.vercel.app/).


> [!WARNING]  
> **Все пользователи и статьи**, отображаемые на этом веб-сайте, **созданы исключительно в демонстрационных целях и НЕ являются реальными**. Любое сходство с реальными людьми, живыми или мертвыми, или реальными статьями является совершенно случайным. Содержание создано для демонстрации функциональности веб-приложения и не представляет собой реальных пользовательских данных или статей.


> [!NOTE]
> Этот репозиторий состоит **исключительно из фронтэнда веб-приложения**. Если вы хотите посмотреть код **бэкенда**, вы можете перейти по ссылке: [Blog App Server](https://github.com/elizaveta-sm/blog-app-server).


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Содержание</summary>
  <ol>
    <li>
      <a href="#about-the-project">О проекте</a>
      <ul>
        <li><a href="#key-features-include">Основной функционал</a></li>
        <li><a href="#built-with">Создано с использованием</a></li>
        <li><a href="#deployed-with">Опубликовано с использованием</a></li>
      </ul>
    </li>
    <li><a href="#usage">Использование веб-приложения</a></li>
    <li><a href="#license">Лицензия</a></li>
    <li><a href="#acknowledgments">Отдельные благодарности</a></li>
  </ol>
</details>

&nbsp;

<!-- ABOUT THE PROJECT -->
## О проекте {#about-the-project}

<center>
  <img alt="blog app logo" src="./Images/blog-app-logo.png" height="175" />
</center>

:small_blue_diamond: *Live Your Life* :small_blue_diamond: - это полностековое веб-приложение для блога, использующее принципы адаптивного и доступного веб-дизайна.  **Созданное с нуля**, приложение было задумано как **инструмент для обучения**, чтобы я могла получить практический опыт и приобрести новые знания и умения в процессе его разработки. 

&nbsp; 

### Основной функционал {#key-features-include}

:star: **Читайте и сортируйте статьи**: исследуйте широкий спектр статей пользователей сайта и сортируйте их по 6 различным категориям.

:star: **Присоединяйтесь к :small_blue_diamond: *Live Your Life* :small_blue_diamond:**: создайте персональную учетную запись.

:star: **публикуйте, редактируйте и удаляйте статьи**: пишите увлекательные статьи и делитесь ими со всем миром. Наслаждайтесь полным контролем над своим контентом с возможностью редактирования и удаления статей по мере необходимости.

> См. <a href="#usage">Использование веб-приложения</a></li> для более подробной информации.

&nbsp; 

### Создано с использованием {#built-with}

:star: **Фронтэнд**
* HTML, CSS, JavaScript 
* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind](https://tailwindcss.com/)
* [Redux Toolkit](https://redux-toolkit.js.org/)

:star: **Бэкенд**
* JavaScript, SQL
* [Node.js](https://nodejs.org/en)
* [PostgreSQL](https://www.postgresql.org/)
* [Express.js](https://expressjs.com/)

&nbsp; 

### Опубликовано с использованием {#deployed-with}

:star: **Фронтэнд и сервер**: [Vercel](https://vercel.com/)

:star: **База данных**: [Supabase](https://supabase.com/)

> См. <a href="#acknowledgments">Отдельные благодарности</a> для получения дополнительной информации.

&nbsp;

<!-- USAGE -->
## Использование веб-приложения {#usage}

### :memo: Страница регистрации
<img align="center" src="./Images/live-your-life_register.png" height="500" />

- Заполните необходимые поля, указав свои учетные данные:
  - Имя пользователя
  - Адрес электронной почты
  - Пароль

---

### :memo: Страница входа
<img align="center" src="./Images/live-your-life_login.png" height="500" />

- Введите свои адрес электронной почты и пароль для входа в систему.

---

### :memo: Главная страница
<img align="center" src="./Images/live-your-life_main-page.png" height="500" />

- После успешного входа в систему вы будете перенаправлены на главную страницу приложения.
- В правом нижнем углу появится уведомление, подтверждающее успешный вход в систему.
- Ваше имя пользователя и дефолтовая фотография профиля отображаются на панели навигации.

---

### :memo: Страница настроек профиля
<img align="center" src="./Images/live-your-life_edit-user-page.png" height="500" />

- Нажмите на свое имя пользователя в панели навигации, чтобы перейти к настройкам профиля.
- Здесь вы можете:
  - Изменить фотографию профиля, вставив URL-адрес изображения.
  - Обновить свое имя пользователя.
  - Полностью удалить свой профиль.

---

### :memo: Страница создания статьи
<img align="center" src="./Images/live-your-life_create-article.png" height="500" />

- Нажмите на вкладку "Create", чтобы создать новую статью.
- Заполните необходимые поля и нажмите "Publish", чтобы закончить создание статьи.

---

### :memo: Созданная статья теперь есть на главной странице
<img align="center" src="./Images/live-your-life_technology-articles.png" height="500" />

- После успешного создания статьи вы можете просмотреть ее среди статей, написанных другими пользователями.

---

### :memo: Страница редактирования/удаления статьи
<img align="center" src="./Images/live-your-life_edit-article-page.png" height="500" />

- Нажмите на статью, которую вы хотите отредактировать или удалить.
- Поля заполнены информацией о статье.
- Вы можете внести изменения или воспользоваться кнопкой удаления ("Delete"), чтобы удалить статью.

---

### :memo: Страница подтверждения выхода из системы
<img align="center" src="./Images/live-your-life_logout-page.png" height="500" />

- Подтвердите свое решение выйти из учетной записи.

&nbsp;

## Лицензия {#licensed}

Распространяется под лицензией MIT.
> См. <a href="https://github.com/elizaveta-sm/live-your-life/blob/main/LICENSE.md">LICENSE.md</a> для получения дополнительной информации.

&nbsp;

## Отдельные благодарности {#acknowledgments}
 
:gem: [Preline](https://preline.co/)

:gem: [React Router](https://reactrouter.com/en/main)

:gem: [Axios](https://axios-http.com/)

:gem: [react-cookie](https://www.npmjs.com/package/react-cookie)

:gem: [uuid](https://www.npmjs.com/package/uuid)

:gem: [bcrypt](https://www.npmjs.com/package/bcrypt)

:gem: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

:gem: [Postgres.js](https://github.com/porsager/postgres)

:gem: [nodemon](https://www.npmjs.com/package/nodemon)
