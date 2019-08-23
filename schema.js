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

const apollo = new ApolloServer({
  typeDefs: myGraphQLSchema,
  resolvers: resolvers,
  subscriptions: {
    path: '/subscriptions'
  },
})
module.exports = apollo