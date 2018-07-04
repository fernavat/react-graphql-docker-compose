const { Prisma } = require('prisma-binding')

const { GraphQLServer } = require('graphql-yoga')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://prisma:4466'
    })
  })
})

/*
server.get('/backendIP', (req, res) => {
  res.set('Content-Type', 'application/json');
  let data = {
    message: 'Hello world, Woooooeeeee!!!!'
  };
  res.send(JSON.stringify(data, null, 2));
});
*/

server.start(() => console.log('GraphQL server is running on http://localhost:4000'))
