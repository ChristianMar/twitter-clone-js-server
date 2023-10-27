# Blog JS Server

## Getting started

install dependencies:

```
yarn cleanup
```

start server:

```
yarn start
```

after you will start the server, you can see on the terminal the username and the password

the server address is:

```
http://localhost:3000/
```

## Configuration

There is a config.js file that contains all configuration

```
  DB CONFIG
  maxUser: maximum number of users created
  maxPost: maximum number of posts created

  SERVER CONFIG
  port: server port,
  delay: response delay (it can be used to test the spinner),

  JWT CONFIG
  secretKey: jwt secret key,
  expiresIn: jwt expiration,
```

## Sample Data

sample user:

```
{
    "id": 0,
    "username": "Reymundo.Ward",
    "firstName": "Reymundo",
    "lastName": "Ward",
    "email": "Reymundo76@yahoo.com",
    "password": "12345",
    "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/869.jpg"
    "language": "en"
},
```

sample post:

```
{
    "id": 0,
    "userId": 72,
    "title": "beatae omnis minus",
    "post": "In labore qui vitae eos sed vel. Vitae et et dolores et quia dolor animi sed. Repellat tempore perspiciatis. Natus quam laboriosam ducimus possimus est blanditiis quibusdam. Architecto nulla est neque necessitatibus quibusdam quia. Enim sapiente est eum repudiandae aut quia.\nQuo quam nulla et doloribus eos qui dolorum labore rerum. Id iusto inventore esse sapiente rerum quas sint et quas. Dolor quia corrupti animi excepturi. Rem sed quo minus dolorem modi eligendi aut. Maiores quibusdam eius molestiae assumenda ut.\nUt quia id ut. Aut sed deserunt praesentium a. Sed odit perspiciatis.",
    "createdAt": "2021-10-26T12:47:18.088Z"
},
```

## Resources

- [POST] /auth/login: login
- [POST] /auth/refresh_token: refresh jwt token
- [POST] /tags/all_tags: retrieve all tags
- [POST] /posts/all_posts: retrieve all posts with pagination
- [POST] /posts/user_posts: retrieve all post by an user with pagination
- [POST] /posts/get_post: retrieve a single post
- [POST] /posts/create_post: create a new post
- [POST] /posts/delete_post: delete a post
- [POST] /posts/update_post: update a post
- [POST] /users/all_users: get all users
- [POST] /users/create_user: create a new user

Open paw file for documentation (remember to add the 'authorization' header in posts and users call)

## Packages

- [json-server](https://github.com/typicode/json-server)
- [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker)
- [@faker-js/faker](https://fakerjs.dev/guide/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
