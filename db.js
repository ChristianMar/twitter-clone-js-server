const { faker } = require("@faker-js/faker");
var _ = require("lodash");
var options = require("./config");
const config = options.CONFIG;

const data = { users: [], posts: [], tags: [] };

const initDb = () => {
  // create users
  data.users = _.times(config.maxUser, (n) => {
    let firstName = faker.person.firstName(),
      lastName = faker.person.lastName();
    let user = {
      id: n,
      username: `${firstName}.${lastName}`,
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email({ firstName: firstName, lastName: lastName }),
      password: "12345",
      avatar: faker.image.avatarGitHub(),
      language: faker.helpers.arrayElement(["en", "it", "es"]),
    };
    if (n === 0)
      console.log(
        `\n\n\n--- USER LOGIN ---\n\nUSERNAME: ${firstName}.${lastName} PASSWORD: 12345\n\n------------------\n\n\n`
      );
    return user;
  });

  data.tags = _.times(config.maxTags, (n) => {
    return faker.word.noun();
  });

  // create posts
  data.posts = _.times(config.maxPost, (n) => {
    let tagNumber = faker.number.int({ min: 1, max: config.maxPostTags });
    return {
      id: n,
      userId: faker.number.int(config.maxUser - 1),
      title: faker.lorem.words(),
      post: faker.lorem.paragraphs(),
      image: faker.image.urlLoremFlickr(),
      createdAt: faker.date.past(),
      tags: [...Array(tagNumber)].map(
        () => data.tags[faker.number.int(data.tags.length - 1)]
      ),
      isBig: faker.datatype.boolean(),
    };
  });
};

const addPost = (post) => {
  post.id = data.posts.length;
  data.posts.push(post);
};

const addTag = (tag) => {
  data.tags.push(tag);
};

const updatePost = (post) => {
  data.posts = _.map(data.posts, (item) =>
    parseInt(item.id) === parseInt(post.id) ? post : item
  );
};

const deletePost = (post) => {
  data.posts = _.filter(
    data.posts,
    (item) => parseInt(item.id) !== parseInt(post.id)
  );
};

const addUser = (user) => {
  user.id = data.users.length;
  data.users.push(user);
};

module.exports = {
  initDb,
  addUser,
  addPost,
  addTag,
  updatePost,
  deletePost,
  data,
};
