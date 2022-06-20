var jsf = require("json-schema-faker");
var fs = require("fs");

jsf.extend("faker", () => {
  const { faker } = require("@faker-js/faker");
  var _ = require("lodash");

  const maxUser = 100,
    maxPost = 500;

  faker.custom = {
    users: {
      users: _.times(maxUser, (n) => {
        let firstName = faker.name.firstName(),
          lastName = faker.name.lastName();
        return {
          id: n,
          username: `${firstName}.${lastName}`,
          firstName: firstName,
          lastName: lastName,
          email: faker.internet.email(firstName, lastName),
          password: "12345",
          avatar: faker.internet.avatar(),
        };
      }),
    },
    posts: {
      posts: _.times(maxPost, (n) => {
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
      }),
    },
  };

  return faker;
});

const schemaUsers = {
  type: "object",
  faker: {
    "custom.users": {
      type: "object",
    },
  },
};

const schemaPosts = {
  type: "object",
  faker: {
    "custom.posts": {
      type: "object",
    },
  },
};

Promise.all([jsf.resolve(schemaUsers), jsf.resolve(schemaPosts)]).then(
  (json) => {
    fs.writeFile(
      "./db/db.json",
      JSON.stringify({ ...json[0], ...json[1] }),
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Mock data generated.");
        }
      }
    );
  }
);
