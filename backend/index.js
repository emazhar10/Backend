const { portalSuspended } = require("pg-protocol/dist/messages");
const db = require("./models");
const user = require("./models/user");
const { User, Posts, Comments } = db;

async function asyncMain() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

 

  try {
    // const eesha = {
    //   firstName : "Eesha",
    //   lastName : "Mazhar",
    //   email: "eesha64@gmail.com",
    //   password: "12345678",
    //   role: "user",
    // };
    const user_1 = {
      firstName: 'Ali',
      lastName: 'Ahmad',
      email: "ali5@gmail.com",
      password: "12345678",
      role: "user",
    };
    const user_2 = {
      firstName: 'Fatima',
      lastName: 'Ali',
      email: "fatima4@gmail.com",
      password: "12345678",
      role: "user",
    };
    //const user1 = await User.create(eesha);
    const u_1 = await User.create(user_1);
    const u_2 = await User.create(user_2);

    
    const post = {
      body: "xyz\n\n\n\n",
      title: "info3",
      userId: u_1.id,
    };
    const post2 = {
      body: "xyz\n\n\n\n",
      title: "knowledge2",
      userId: u_1.id,

    };
    const post3 = {
      body: "xyz\n\n\n\n",
      title: "my account 2",
      userId: u_1.id,

    };
    const post4 = {
      body: "xyz\n\n\n\n",
      title: "details2",
      userId: u_1.id,

    };
    const post5 = {
      body: "xyz\n\n\n\n",
      title: "privacy2",
      userId: u_2.id,

    };

    const coment = {
      comments: "hello\nb",
      userId: u_2.id,
    };
    const coment1 = {
      comments: "true\nb",
      userId: u_2.id,
    };
    const coment2 = {
      comments: "agree\nb",
      userId: u_2.id,
    };
    const coment3 = {
      comments: "right\nb",
      userId: u_2.id,
    };
    const coment4 = {
      comments: "hmm ok\nb",
      userId: u_1.id,
    };

    const comment = await Comments.create(coment);
    const comment1 = await Comments.create(coment1);
    const comment2 = await Comments.create(coment2);
    const comment3 = await Comments.create(coment3);
    const comment4 = await Comments.create(coment4);

    const data_p = await Posts.create(post);
    const data_p1 = await Posts.create(post2);
    const data_p2 = await Posts.create(post3);
    const data_p3 = await Posts.create(post4);
    const data_p4 = await Posts.create(post5);

    await data_p.save();
    await data_p1.save();
    await data_p2.save();
    await data_p3.save();
    await data_p4.save();

    await comment.save();
    await comment1.save();
    await comment2.save();
    await comment3.save();
    await comment4.save();


  } catch (error) {
    console.error("Unable to insert to the database:", error);
  }
}
asyncMain();
