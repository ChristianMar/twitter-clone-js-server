# Simple Fake Server

## Getting started

install dependencies:

```
yarn cleanup
```

start server:

```
yarn start
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

- [POST] login: login method
- [POST] all_posts: retrieve all posts with pagination
- [POST] user_posts: retrieve all post by an user with pagination
- [POST] posts: create a new post

Open paw file for documentation
