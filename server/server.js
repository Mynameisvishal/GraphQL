const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
require('dotenv').config();
const { authCheck } = require('./helpers/auth');

// express server
const app = express();
// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// db
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Error', error);
    }
};
// execute database connection
db();

// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));
// resolvers
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});

// applyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpserver = http.createServer(app);

// rest endpoint
app.get('/rest', authCheck, function(req, res) {
    res.json({
        data: 'you hit rest endpoint great!'
    });
});

// port
app.listen(process.env.PORT, function() {
    console.log(`server is ready at http://localhost:${process.env.PORT}`);
    console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
});
