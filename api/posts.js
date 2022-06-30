const jwtUtilities = require("../utils/jwtUtilities");
const _ = require("lodash");

const database = require("../db.js");
const userUtilities = require("../utils/userUtilities");

const getPosts = (req, res, router) => {
  const { limit, page } = req.body;

  let verifyTokenResult = jwtUtilities.verifyToken(
    req.headers.authorization,
    res,
    router
  );

  if (verifyTokenResult === true) {
    const db = router.db;
    let posts = db.get("posts").value();
    let tmpPage, tmpLimit;
    if (page === null || page === undefined) tmpPage = 0;
    else tmpPage = page - 1;
    if (limit === null || limit === undefined) tmpLimit = 100;
    else tmpLimit = limit;

    posts = _.orderBy(posts, [(item) => item.createdAt], ["desc"]);
    arr = _.chunk(posts, tmpLimit);

    res.json({
      posts: !arr[tmpPage]
        ? []
        : arr[tmpPage].map((item) => ({
            ...item,
            user: userUtilities.getUserById(item.userId, router),
          })),
      cursor: {
        next: !arr[tmpPage + 1] ? false : true,
        prev: !arr[tmpPage - 1] ? false : true,
      },
    });
  }
};

const getUserPosts = (req, res, router) => {
  const { limit, page, userId } = req.body;

  let verifyTokenResult = jwtUtilities.verifyToken(
    req.headers.authorization,
    res,
    router
  );

  if (verifyTokenResult === true) {
    const db = router.db;
    let posts = db.get("posts").value();
    let tmpPage, tmpLimit;
    if (page === null || page === undefined) tmpPage = 0;
    else tmpPage = page - 1;
    if (limit === null || limit === undefined) tmpLimit = 100;
    else tmpLimit = limit;

    posts = _.filter(
      posts,
      (item) => parseInt(item.userId) === parseInt(userId)
    );
    if (!posts) res.json({ posts: [], cursor: { next: false, prev: false } });
    else {
      posts = _.orderBy(posts, [(item) => item.createdAt], ["desc"]);
      arr = _.chunk(posts, 100);

      res.json({
        posts: !arr[tmpPage]
          ? []
          : arr[tmpPage].map((item) => ({
              ...item,
              user: userUtilities.getUserById(item.userId, router),
            })),
        cursor: {
          next: !arr[tmpPage + 1] ? false : true,
          prev: !arr[tmpPage - 1] ? false : true,
        },
      });
    }
  }
};

const getPost = (req, res, router) => {
  const { postId } = req.body;

  let verifyTokenResult = jwtUtilities.verifyToken(
    req.headers.authorization,
    res,
    router
  );

  if (verifyTokenResult === true) {
    const db = router.db;
    let posts = db.get("posts").value();
    let post = _.filter(
      posts,
      (item) => parseInt(item.id) === parseInt(postId)
    )[0];
    res.json({
      post: !post ? {} : post,
    });
  }
};

const createPost = (req, res, router) => {
  const { userId, title, post, image, createdAt } = req.body;

  let verifyTokenResult = jwtUtilities.verifyToken(
    req.headers.authorization,
    res,
    router
  );

  if (verifyTokenResult === true) {
    database.addPost({ userId, title, post, image, createdAt });
    res.json({
      success: true,
    });
  }
};

const deletePost = (req, res, router) => {
  const { postId } = req.body;

  let verifyTokenResult = jwtUtilities.verifyToken(
    req.headers.authorization,
    res,
    router
  );

  if (verifyTokenResult === true) {
    database.deletePost({ id: postId });
    res.json({
      success: true,
    });
  }
};

const updatePost = (req, res, router) => {
  const { postId, userId, title, post, image, createdAt } = req.body;

  let verifyTokenResult = jwtUtilities.verifyToken(
    req.headers.authorization,
    res,
    router
  );

  if (verifyTokenResult === true) {
    database.updatePost({ id: postId, userId, title, post, image, createdAt });
    res.json({
      success: true,
    });
  }
};

module.exports = {
  getPosts,
  getUserPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
};
