const db = require("../../models");
const { Posts , User} = db;

describe("Testing Post Model", () => {
  const validParams = {
    firstName: "Eesha",
    lastName: "Mazhar",
    email: "eesha@gmail.com",
    password: "12345678",
    body: "xyz\nabc\ndef\nghi\nyus",
    title: "valid information 12",
    userId: "1",
  };

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await User.create(validParams);
    await Posts.create(validParams);
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it("Does not allow duplicate title", async () => {
    const duplicatetitle = {
      ...validParams
    };

    try {
      await Posts.create(duplicatetitle);
      throw Error("Post should not be created");
    } catch (error) {
      expect(error.message).toBe("Validation error: post with this title already exists");
   }
  });

  it("Body should be 5 length atleast ", async () => {
    const invalidbody = {
      ...validParams,
      title: "new title",
      body: "\n\n\n",
    };

    try {
      await Posts.create(invalidbody);
      throw Error("post should not be created");
    } catch (error) {
      expect(error.message).toBe(
        "Validation error: count of paragraph should not be less then 5");
    }
  });

});