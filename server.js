const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios').default

const typeDefs = gql`
	
	type repoNames{
		name: String
	}

	type Repository{
		name: String
	}

	type Owner {
		login: String
	}

	type User{
		name: String
		id: String
		login: String
		isPrivate: Boolean
		diskUsage: Int
		owner: Owner
		repository(name: String!): Repository
	}

  	type Query{
		user(login: String!): User
  	}
`
const query = `
	query searchUser($login: String!){
		user(login: $login){
			name
			id
			login
			repository(name: "foodApp"){
				name
				isPrivate
				owner{
					login
				}
				diskUsage
			}
		}
	}
`

const resolvers = {
	Query: {
		user: async (_, { login }) => {
			const response = await axios({
				method: 'post',
				baseURL: 'https://api.github.com/graphql',
				headers: {
					Authorization: "Bearer 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"
				},
				data: {
					query: query,
					variables: { login }
				}
			})

			console.log(response.data.data.user.repository)

			const d = {
				name: response.data.data.user.name,
				id: response.data.data.user.id,
				login: response.data.data.user.login,
				repository: {
					name: response.data.data.user.repository.name
				},
				isPrivate: response.data.data.user.repository.isPrivate,
				owner: {
					login: response.data.data.user.repository.owner.login
				},
				diskUsage: response.data.data.user.repository.diskUsage
			}

			return d

		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(() => console.log("Server running at 4000"))