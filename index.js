const db = require("./models");
const { User } = db;

async function asyncMain() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  try {
    const eesha = {
      firstName: "Eesha",
      lastName: "Mazhar",
      fullName: firstName + ' ' + lastName ,
      email: "eesha9@gmail.com",
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
