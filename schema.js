const { gql } = require('apollo-server')

const typeDefs = gql`
	type repoData{
		name: String
		isPrivate: Boolean
		diskUsage: Int
		owner: Owner
	}

	type Repositories{
		nodes: [repoData]
	}

	type Owner {
		login: String
	}

	type User{
		name: String
		repositories(last: Int): Repositories
	}

	
	  type Blob {
		text: String
	  }
	
	  type Entry {
		name: String
		fileCount: Int
		object: Blob
	  }
	
	  type Tree {
		id: String
		entries: [Entry]
	  }
	
	  type Repository {
		name: String
		owner: Owner
		isPrivate: Boolean
		diskUsage: Int
		object(expression: String): Tree
	  }

  	type Query{
		user(login: String!): User
		repository(name: String!, owner: String!): Repository
  	}
`

module.exports = typeDefs

// 	`query MyQuery {
// 	repository(name: "GreenridgeApp", owner: "roma8389") {
// 	  name
// 	  owner {
// 		login
// 	  }
// 	  isPrivate
// 	  diskUsage
// 	  object(expression: "master:") {
// 		... on Tree {
// 		  entries{
// 			name
// 			object{
// 			  ... on Blob{
// 				text
// 			  }
// 			}
// 		  }
// 		}
// 	  }
// 	}
//   }`