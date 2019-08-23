const {PubSub} = require('graphql-subscriptions')

const pubsub = new PubSub()
const resolvers = {
  Subscription: {
    someSub: {
      subscribe: () => {
        console.log('here at subs')
        return pubsub.asyncIterator('SOMETHING_CHANGED')
      },
    },
  },
  Query: {
    someQuery: () => 'query test',
  },
  Mutation: {
    someMutation: () => 'mutation test',
    testSub: () => pubsub.publish('SOMETHING_CHANGED', 'sub test'),
  },
}

module.exports = resolvers