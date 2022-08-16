const { portalSuspended } = require("pg-protocol/dist/messages");
const db = require("./models");
const { User, Posts, Comments } = db;


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
      email: "eesha2123@gmail.com",
      password: "153123808",
      role: "user",
    };114
    const user_1 = {
      firstName: "Ali",
      lastName: "Ahmad",
      email: "ali8123@gmail.com",
      password: "153123808",
      role: "user",
    };
    const user_2 = {
      firstName: "Fatima",
      lastName: "Ali",
      email: "fatima123@gmail.com",
      password: "153123808",
      role: "user",
    };
    //const user1 = await User.create(eesha);
    const u_1 = await User.create(user_1);
    const u_2 = await User.create(user_2);

    const post = {
      body: "xyz\n\n\n\n",
      title: "abc1238",
      userId: u_1.id,
    };
    const post2 = {
      body: "xyz\n\n\n\n",
      title: "def1238",
      userId: u_1.id,
    };
    const post3 = {
      body: "xyz\n\n\n\n",
      title: "ghi1238",
      userId: u_1.id,
    };
    const post4 = {
      body: "xyz\n\n\n\n",
      title: "jkl1238",
      userId: u_1.id,
    };
    const post5 = {
      body: "xyz\n\n\n\n",
      title: "mno1238",
      userId: u_2.id,
    };

    const p_1 = await Posts.create(post);
    const p_2 = await Posts.create(post2);
    const p_3 = await Posts.create(post3);
    const p_4 = await Posts.create(post4);
    const p_5 = await Posts.create(post5);

    const coment = {
      comments: "hiii\nb",
      userId: u_2.id,
      postId: p_1.id,
    };
    const coment1 = {
      comments: "true\nb",
      userId: u_2.id,
      postId: p_2.id,
    };
    const coment2 = {
      comments: "agree\nb",
      userId: u_2.id,
      postId: p_3.id,
    };
    const coment3 = {
      comments: "right\nb",
      userId: u_1.id,
      postId: p_4.id,
    };
    const coment4 = {
      comments: "hmm ok\nb",
      userId: u_1.id,
      postId: p_5.id,
    };

    const comment = await Comments.create(coment);
    const comment1 = await Comments.create(coment1);
    const comment2 = await Comments.create(coment2);
    const comment3 = await Comments.create(coment3);
    const comment4 = await Comments.create(coment4);

    await p_1.save();
    await p_2.save();
    await p_3.save();
    await p_4.save();
    await p_5.save();

    await comment.save();
    await comment1.save();
    await comment2.save();
    await comment3.save();
    await comment4.save();

  

    const commentsOfUsers = await Comments.findAll({
      where: {
        userId: u_2.id,
      },
      include: [
        {
          model: Posts,
          as: "post"
        },
      ],
      raw: true,
    });

    const postsOfUser = await Posts.findAll({
      where: {
        userId: u_2.id,
      },
      raw: true,
    });



    //const allData = [...postsOfUser, ...commentsOfUsers]
    const allData_2 = {
      posts: postsOfUser,
      comments : commentsOfUsers
    }

    // for(let i =0; i< commentsOfUsers.length; i++){
    //   const a_post = {}
    //   for(const property in commentsOfUsers[i]){
    //     if(property.toString().startsWith("post.")){
    //       a_post[property.toString().replace("post.", "")] = commentsOfUsers[i][property]
    //     }
    //   }
    //   if(a_post.id){
    //     postsOfUser.push(a_post)
    //   }
    // }

    console.log(allData_2)
  


    // let postsofusers = await sequelize.query(`select  p.id as postid, c.id as comid, "comments" as "comments",
    // p.body as body, p.title as title
    // from "Comments" as c
    // inner join "Posts" as p
    // on p."id" = c."postId"
    // where c."userId" = ${u_2.id} or p."userId" = ${u_2.id}
    // `)
    // console.log("posts", postsofusers);
  } catch (error) {
    console.error("Unable to insert to the database:", error);
  }
}
asyncMain();
