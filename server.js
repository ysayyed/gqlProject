const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(() => console.log(`🚀  Server ready at: 4000`))
