const { gql } = require('apollo-server-express');
const { posts } = require('../temp');
const { authCheck } = require('../helpers/auth');

// queries
const totalPosts = () => posts.length;
const allPosts = async (parent, args, { req }) => {
    await authCheck(req);
    return posts;
};

// mutation
const newPost = (parent, args) => {
    // console.log(args);
    // create a new post object
    const post = {
        id: posts.length + 1,
        ...args.input
    };
    // push new post object to posts array
    posts.push(post);
    return post;
};

module.exports = {
    Query: {
        totalPosts,
        allPosts
    },
    Mutation: {
        newPost
    }
};
