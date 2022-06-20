const jsonServer = require("json-server");
const _ = require("lodash");
const server = jsonServer.create();
const router = jsonServer.router("./db/db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post("/login", (req, res) => {
  const db = router.db;
  let user = db.get("users").find({ username: req.body.username }).value();
  if (!user) {
    res
      .status(401)
      .json({ error: "Your password or username does not match." });
  } else if (user.password !== req.body.password) {
    res
      .status(401)
      .json({ error: "Your password or username does not match." });
  } else {
    delete user.password;
    res.json(user);
  }
});

const getUser = (userId) => {
  const db = router.db;
  let user = db.get("users").value();
  user = _.filter(user, (item) => parseInt(item.id) === parseInt(userId))[0];
  delete user.password;
  return user;
};

server.post("/all_posts", (req, res) => {
  const db = router.db;
  let posts = db.get("posts").value();
  if (!posts) res.json({ posts: [], cursor: { next: false, prev: false } });
  else {
    posts = _.orderBy(posts, [(item) => item.createdAt], ["desc"]);
    if (req.body.limit === null || req.body.limit === undefined) {
      arr = _.chunk(posts, 100);
      if (req.body.page === null || req.body.page === undefined) {
        res.json({
          posts: !arr[0]
            ? []
            : arr[0].map((item) => ({
                ...item,
                user: getUser(item.userId),
              })),
          cursor: { next: !arr[1] ? false : true, prev: false },
        });
      } else {
        let page = req.body.page - 1;
        res.json({
          posts: !arr[page]
            ? []
            : arr[page].map((item) => ({
                ...item,
                user: getUser(item.userId),
              })),
          cursor: {
            next: !arr[page + 1] ? false : true,
            prev: !arr[page - 1] ? false : true,
          },
        });
      }
    } else {
      let arr = _.chunk(posts, req.body.limit);
      if (req.body.page === null || req.body.page === undefined) {
        res.json({
          posts: !arr[0]
            ? []
            : arr[0].map((item) => ({
                ...item,
                user: getUser(item.userId),
              })),
          cursor: { next: !arr[1] ? false : true, prev: false },
        });
      } else {
        let page = req.body.page - 1;
        res.json({
          posts: !arr[page]
            ? []
            : arr[page].map((item) => ({
                ...item,
                user: getUser(item.userId),
              })),
          cursor: {
            next: !arr[page + 1] ? false : true,
            prev: !arr[page - 1] ? false : true,
          },
        });
      }
    }
  }
});

server.post("/user_posts", (req, res) => {
  const db = router.db;
  if (req.body.userId === null || req.body.userId === undefined) {
    res.json({
      posts: [],
      cursor: { next: false, prev: false },
    });
  } else {
    let posts = db.get("posts").value();
    posts = _.filter(
      posts,
      (item) => parseInt(item.userId) === parseInt(req.body.userId)
    );
    posts = _.orderBy(posts, [(item) => item.createdAt], ["desc"]);
    if (!posts) res.json({ posts: [], cursor: { next: false, prev: false } });
    else {
      if (req.body.limit === null || req.body.limit === undefined) {
        let arr = _.chunk(posts, 100);
        if (req.body.page === null || req.body.page === undefined) {
          res.json({
            posts: !arr[0]
              ? []
              : arr[0].map((item) => ({
                  ...item,
                  user: getUser(item.userId),
                })),
            cursor: { next: !arr[1] ? false : true, prev: false },
          });
        } else {
          let page = req.body.page - 1;
          res.json({
            posts: !arr[page]
              ? []
              : arr[page].map((item) => ({
                  ...item,
                  user: getUser(item.userId),
                })),
            cursor: {
              next: !arr[page + 1] ? false : true,
              prev: !arr[page - 1] ? false : true,
            },
          });
        }
      } else {
        let arr = _.chunk(posts, req.body.limit);
        if (req.body.page === null || req.body.page === undefined) {
          res.json({
            posts: !arr[0]
              ? []
              : arr[0].map((item) => ({
                  ...item,
                  user: getUser(item.userId),
                })),
            cursor: { next: !arr[1] ? false : true, prev: false },
          });
        } else {
          let page = req.body.page - 1;
          res.json({
            posts: !arr[page]
              ? []
              : arr[page].map((item) => ({
                  ...item,
                  user: getUser(item.userId),
                })),
            cursor: {
              next: !arr[page + 1] ? false : true,
              prev: !arr[page - 1] ? false : true,
            },
          });
        }
      }
    }
  }
  jsonServer.rewriter;
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
