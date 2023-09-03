const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios').default

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
		id: String
		login: String
		repositories(first: Int!): Repository
	}

  	type Query{
		user(login: String!): User
  	}
`
const query = `
	query searchUser($login: String!, $first: Int!){
		user(login: $login){
			name
			id
			login
			repositories(first: $first){
				nodes{
					name
					isPrivate
					owner{
						login
					}
					diskUsage
				}
			}
		}
	}
`


const resolvers = {
	Query: {
		user: async (_, { login, first }) => {
			const response = await axios({
				method: 'post',
				baseURL: 'https://api.github.com/graphql',
				headers: {
					Authorization: "Bearer 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"
				},
				data: {
					query: query,
					variables: { login, first }
				}
			}).then((response) => { console.log(response.data); return response.data })
				.catch((error) => { console.log(error) })
			// console.log(response)
			// const userData = await response.data.data.user

			// const d = {
			// 	name: userData.name,
			// 	id: userData.id,
			// 	login: userData.login,
			// 	repositories: {
			// 		nodes: [userData.repositories.map(
			// 			data => ({
			// 				name: data.name,
			// 				isPrivate: data.isPrivate,
			// 				diskUsage: data.diskUsage,
			// 				owner: {
			// 					login: data.owner.login
			// 				}
			// 			})
			// 		)]
			// 	}
			// }

			return response

		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(() => console.log("Server running at 4000"))


