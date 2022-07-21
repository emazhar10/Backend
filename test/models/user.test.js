const db = require("../../models");
const { User } = db;

describe("Testing User Model", () => {
  const validParams = {
    firstName: "Eesha",
    lastName: "Mazhar",
    email: "eesha@gmail.com",
    password: "12345678",
  };

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await User.create(validParams);
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it("returns full name of the user", async () => {
    const checkUser = await User.findByPk(1);
    expect(checkUser.fullName).toBe(
      `${checkUser.firstName} ${checkUser.lastName}`
    );
  });

  it("Does not allow duplicate emails", async () => {
    const duplicateEmail = {
      ...validParams,
      email: validParams.email,
    };

    try {
      await User.create(duplicateEmail);
      throw Error("user should not be created");
    } catch (error) {
      expect(error.message).toBe("Validation error: User with this email already exists");
    }
  });

  it("Does not allow invalid emails", async () => {
    const invalidEmail = {
     ...validParams,
      email: "invalidEmail",
    };

    try {
      await User.create(invalidEmail);
      throw Error("user should not be created");
    } catch (error) {
      expect(error.message).toBe("Validation error: Email is not valid");
    }
  });

  it("Password should be 8 length atleast ", async () => {
    const invalidPassword = {
      ...validParams,
      email: "eesha1@gmail.com",
      password: "1234",
    };

    try {
      await User.create(invalidPassword);
      throw Error("user should not be created");
    } catch (error) {
      expect(error.message).toBe("Validation error: Password should be 8 characters long");
    }
  });

  it("check the full name condition", async () => {
    try {
      await User.build({
        ...validParams,
        fullName: "Eesha Mazhar",
      });
      throw Error("this should not happen");
    } catch (error) {
      expect(error.message).toBe("Do not try to set the `fullName` value!");
    }
  });
});
