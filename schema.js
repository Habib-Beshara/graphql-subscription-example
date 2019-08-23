const {ApolloServer, gql} = require('apollo-server-express')
const resolvers = require('./resolvers')

const myGraphQLSchema = gql`
  type Subscription {
    someSub: String!
  }
  
  type Query {
    someQuery: String!
  }
  
  type Mutation {
    someMutation: String!
    testSub: String!
    
  }
  
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
  
`

const schema = new ApolloServer({
  typeDefs: myGraphQLSchema,
  resolvers: resolvers,
  // subscriptions: {
  //   path: '/graphql'
  // },
  playground: {
    endpoint: '/graphql',
    subscriptionEndpoint: '/graphql'
  },
})
module.exports = schema