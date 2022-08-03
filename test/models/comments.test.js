const db = require("../../models");
const { Posts, User, Comments } = db;

describe("Testing Comments Model", () => {
  const validParams = {
    firstName: "Eesha",
    lastName: "Mazhar",
    email: "eesha@gmail.com",
    password: "12345678",
    body: "xyz\nabc\ndef\nghi\nyus",
    title: "valid information 12",
    userId: "1",
    comments: "xyz\n abc",
  };

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await User.create(validParams);
    await Posts.create(validParams);
    await Comments.create(validParams);
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it(" Comments should not be more than 2 paragraphs ", async () => {
    const invalidbody = {
      ...validParams,
      comments: "xyz",
    };

    try {
      await Comments.create(invalidbody);
     throw Error("comment should not be created");
    } catch (error) {
      expect(error.message).toBe("Validation error: count of comment should not be more then 2 paragraph " );
    }
  });
});
