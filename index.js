const { portalSuspended } = require("pg-protocol/dist/messages");
const db = require("./models");
const user = require("./models/user");
const { User, Posts , Comments } = db;

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
      email: "eesha60@gmail.com",
      password: "12345678",
      role: "user",
    };
    const user1 = await User.create(eesha);
    const post  = {
      body: "xyz\n\n\n\n",
      title: "information12",
      userId: user1.id
    }
    const coment ={
      comments : "a\nb",
      userId: user1.id
    }
    const comment = await Comments.create(coment)
    const post1 = await Posts.create(post);
   
    await post1.save()
    await comment.save()

  } catch (error) {
    console.error("Unable to insert to the database:", error);
  }

}
asyncMain();
