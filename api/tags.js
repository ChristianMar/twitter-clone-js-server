const getTags = (req, res, router) => {
  const db = router.db;
  let tags = db.get("tags").value();

  res.json({
    tags: tags,
  });
};

module.exports = {
  getTags,
};
