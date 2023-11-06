const getTags = (req, res, router) => {
  const db = router.db;
  let tags = db.get("tags").value();

  res.json({
    tags: tags,
  });
};

const getMostUsedTags = (req, res, router) => {
  const db = router.db;
  let tags = db.get("tags").value();

  res.json({
    tags: tags.slice(0, 7),
  });
};

module.exports = {
  getTags,
  getMostUsedTags,
};
