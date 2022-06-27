const jsonServer = require("json-server");
const _ = require("lodash");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const database = require("./db.js");
const auth = require("./api/auth");
const users = require("./api/users");
const posts = require("./api/posts");

server.use(jsonServer.bodyParser);
server.use(middlewares);

const port = 3000;
const delay = 1000;

database.initDb();
const router = jsonServer.router(database.data);

addDelay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, delay);
  });
};

server.post("/auth/login", (req, res) => {
  addDelay().then(() => {
    auth.login(req, res, router);
  });
});

server.post("/auth/refresh_token", (req, res) => {
  addDelay().then(() => {
    auth.login(req, res, router);
  });
});

server.post("/posts/all_posts", (req, res) => {
  addDelay().then(() => {
    posts.getPosts(req, res, router);
  });
});

server.post("/posts/user_posts", (req, res) => {
  addDelay().then(() => {
    posts.getUserPosts(req, res, router);
  });
});

server.post("/posts/get_post", (req, res) => {
  addDelay().then(() => {
    posts.getPost(req, res, router);
  });
});

server.post("/posts/create_post", (req, res) => {
  addDelay().then(() => {
    posts.createPost(req, res, router);
  });
});

server.post("/posts/delete_post", (req, res) => {
  addDelay().then(() => {
    posts.deletePost(req, res, router);
  });
});

server.post("/posts/update_post", (req, res) => {
  addDelay().then(() => {
    posts.updatePost(req, res, router);
  });
});

server.post("/users/all_users", (req, res) => {
  addDelay().then(() => {
    users.getUsers(req, res, router);
  });
});

server.post("/users/create_user", (req, res) => {
  addDelay().then(() => {
    users.createUser(req, res, router);
  });
});

server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
