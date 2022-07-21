const db = require("./models");
const { User } = db;



async function asyncMain() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  var firstName = "Eesha"
  var lastName = "Mazhar" 
  
  try {
    const eesha = {
      firstName,
      lastName,
      email: "eesha26@gmail.com",
      password: "12345678"

    };
    const user1 = await User.create(eesha);
  console.log(user1.fullName);
} catch (error) {
    console.error("Unable to insert to the database:", error);
  }

  //console.log(fullName);

  const users = await User.findAll({
    order: ["id"],
  });
  console.log(users[0]);

}
asyncMain();