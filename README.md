# Дипломная работа: Backend

# Описание
Репозиторий *movies-explorer-api* для приложения проекта `Diplom`, включающий бэкенд со следующими возможностями: авторизация и регистрация пользователей, обновление данных пользователей, получение, сохранение и удаление фильмов.

**Яндекс.Облако**
* Ссылка на сервер, размещенный на удалённой машине в Яндекс.облаке - http://api.tisaichdiplom.students.nomoredomains.icu
* Публичный IP-адрес - 84.252.129.181

### Обзор

1. Создан сервер на express 
2. Настроены мартшруты для отдачи данных от сервера:  
  - GET /users/me (вернуть информацию о пользователе (email и имя))
  - PATCH /users/me (обновить информацию о пользователе (email и имя))
  - GET /movies (вернуть все сохранённые пользователем фильмы)
  - POST /movies (создать фильм с переданными в теле свойствами )
  - DELETE /movies/movieId (удалить сохранённый фильм по _id)
3. Реализована регистрация, авторизация:
  - POST /signup (создать пользователя с переданными в теле - email, password и name)
  - POST /signin (проверить переданные в теле почту и пароль, вернуть JWT)
4. Настроены два файла для хранения логов:
  - *request.log*, чтобы хранить информацию о всех запросах к API;
  - *error.log*, чтобы хранить информацию об ошибках, которые возвращает API.
5. Настроена централизованная обработка ошибок
6. Используются Joi и celebrate для валидации входных данных
7. Используется bcryptjs.hash() для сохранения в БД хэш-пароля
8. Секретный ключ для подписи токена хранится на сервере в файле .env