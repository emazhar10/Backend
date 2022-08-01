const { portalSuspended } = require("pg-protocol/dist/messages");
const db = require("./models");
const user = require("./models/user");
const { User, Posts } = db;

async function asyncMain() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  var firstName = "Eesha";
  var lastName = "Mazhar";

  try {
    const eesha = {
      firstName,
      lastName,
      email: "eesha36@gmail.com",
      password: "12345678",
      role: "user",
    };
    const user1 = await User.create(eesha);
    const post  = await Posts.build({
      body: "xyz",
      title: "information ",
    })
    await user1.addPost(post)
    await post.save()
    await user1.save()
    console.log(user1);
  } catch (error) {
    console.error("Unable to insert to the database:", error);
  }

  // try {
  //   const post_data = {
  //     body: "xyz",
  //     title: "information ",
  //     userId: 1,
  //   };
  //   console.log("workingggg");
  //   const data = await Posts.create(post_data);
  //   console.log(data.userId, "datacoming");
  // } catch (error) {
  //   console.log("Unable to enter post data in database", error);
  // }

  // const users = await User.findAll({
  //   order: ["id"],
  // });
  // console.log(users[0]);
}
asyncMain();
