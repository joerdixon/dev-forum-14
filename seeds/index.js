const sequelize = require("../config/connection");
const {User, Post, Comment} = require("../models/");

// User account seeds
const seed = async ()=> {
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            username: "joerdixon",
            password: "passwordj"
        },
        {
            username: "ameliarosborn",
            password: "passworda"
        },
        {
            username: "bella123",
            password: "passwordb"
        }
    ],{
        individualHooks:true
    })

    // Post seeds
    const posts = await Post.bulkCreate([
        {
            title: "I love javascript",
            content: "I sure do",
            UserId: 1
        },
        {
            title: "I love html",
            content: "like lego",
            UserId: 2
        },
        {
            title: "I love css",
            content: "fancy colors are fun",
            UserId: 3
        },
        {
            title: "I love express",
            content: "I sure do love express especially since it makes me better at node.",
            UserId: 1
        }
    ])
    
    // Comment seeds
    const comments = await Comment.bulkCreate([
        {
            content: "whattttt",
            UserId: 1,
            PostId: 3
        },
        {
            content: "no way",
            UserId: 1,
            PostId: 2
        },
        {
            content: "thats so cool",
            UserId: 2,
            PostId: 4
        },
        {
            content: "love that for you",
            UserId: 3,
            PostId: 4
        },
        {
            content: "I dont",
            UserId: 3,
            PostId: 1
        },
    ])
    console.log("seeded!")
    process.exit(0)
}

seed();