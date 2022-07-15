const { Sequelize } = require("sequelize");
const { username, password, dialect, database, host } =
  require("./config/config.json")["development"];
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const { User } = require("./models");

async function asyncMain() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  try {
    const eesha = {
      firstName: "Eesha",
      lastName: "Mazhar",
      email: "eesha4@gmail.com",
      password: "12345678"
    };
    await User.create(eesha);
  } catch (error) {
    console.error("Unable to insert to the database:", error);
  }

  const users = await User.findAll({
    order: ["id"],
  });
  console.log(users);

}

asyncMain();
