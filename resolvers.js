const axios = require('axios').default
require('dotenv').config()

const queryA = `
	query searchUser($login: String!){
		user(login: $login){
			name
			repositories(last: 2){
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
		user: async (_, { login }) => {
			const response = await axios({
				method: 'post',
				baseURL: 'https://api.github.com/graphql',
				headers: {
					Authorization: `Bearer ${process.env.TOKEN}`
				},
				data: {
					query: queryA,
					variables: { login }
				}
			}).then((response) => { return response.data })
				.catch((error) => { console.log(error) })
			const userData = await response.data.user
			console.log(userData.repositories.nodes)

			const nodes = userData.repositories.nodes.map(
				data => ({
					name: data.name,
					isPrivate: data.isPrivate,
					diskUsage: data.diskUsage,
					owner: {
						login: data.owner.login
					}
				})
			)
			const d = {
				name: userData.name,
				repositories: {
					nodes: nodes
				}
			}

			return d

		}
	}
}

module.exports = resolvers

