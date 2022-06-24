const { faker } = require("@faker-js/faker");
var _ = require("lodash");

const maxUser = 100,
  maxPost = 500;

const data = { users: [], posts: [] };

const initDb = () => {
  // create users
  data.users = _.times(maxUser, (n) => {
    let firstName = faker.name.firstName(),
      lastName = faker.name.lastName();
    let user = {
      id: n,
      username: `${firstName}.${lastName}`,
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email(firstName, lastName),
      password: "12345",
      avatar: faker.internet.avatar(),
      language: faker.helpers.arrayElement(["en", "it", "es"]),
    };
    if (n === 0)
      console.log(
        `\n\n\n--- USER LOGIN ---\n\nUSERNAME: ${firstName}.${lastName} PASSWORD: 12345\n\n------------------\n\n\n`
      );
    return user;
  });

  // create posts
  data.posts = _.times(maxPost, (n) => {
    let images = [
      null,
      faker.image.abstract(),
      faker.image.animals(),
      faker.image.business(),
      faker.image.cats(),
      faker.image.city(),
      faker.image.fashion(),
      faker.image.food(),
      faker.image.nature(),
      faker.image.nightlife(),
      faker.image.people(),
      faker.image.sports(),
      faker.image.technics(),
      faker.image.transport(),
    ];
    let selected = faker.datatype.number(images.length, 0);
    return {
      id: n,
      userId: faker.datatype.number(maxUser, 0),
      title: faker.lorem.words(),
      post: faker.lorem.paragraphs(),
      image: images[selected],
      createdAt: faker.date.past(),
    };
  });
};

const addPost = (post) => {
  post.id = data.posts.length;
  data.posts.push(post);
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
  updatePost,
  deletePost,
  data,
};
