const { gql } = require('apollo-server')

const typeDefs = gql`


	type repoData{
		name: String
		isPrivate: Boolean
		diskUsage: Int
		owner: Owner
	}

	type Repository{
		nodes: [repoData]
	}

	type Owner {
		login: String
	}

	type User{
		name: String
		repositories(last: Int): Repository
	}

  	type Query{
		user(login: String!): User
  	}
`

module.exports = typeDefs