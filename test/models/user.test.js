const db = require("../../models");
const { User } = db;

describe("Testing User Model", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it("Does not allow duplicate emails", async () => {
    const validParams = {
      firstName: "Eesha",
      lastName: "Mazhar",
      email: "eesha@gmail.com",
      password: "12345678",
    };

    const duplicateEmail = {
      firstName: "Eesha",
      lastName: "Mazhar",
      email: validParams.email,
      password: "12345678",
    };

    await User.create(validParams);

    try {
      await User.create(duplicateEmail);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Validation error");
    }
  });

  it("Password should be 8 length atleast ", async () => {
    const invalidPassword = {
      firstName: "Eesha1",
      lastName: "Mazhar1",
      email: "eesha1@gmail.com",
      password: "1234",
    };

    try {
      await User.create(invalidPassword);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Password should be 8 characters long");
    }
  });

  it("Saves the user in database", async () => {
    const validParams = {
      firstName: "Eesha",
      lastName: "Mazhar",
      fullName: firstName + ' ' + lastName,
      email: "eesha.mazhar@gmail.com",
      password: "12345678",
    };
    const user = await User.create(validParams);
    const checkUser = await User.findByPk(user.id);
    expect(user.firstName).toBe(checkUser.firstName);
  });
});
