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

const queryB = `
query MyQuery {
	repository(name: "GreenridgeApp", owner: "roma8389") {
	  name
	  owner {
		login
	  }
	  isPrivate
	  diskUsage
	  object(expression: "master:src"){
		id
		... on Tree{
			entries{
				name
				object{
					... on Blob{
						text
					}
				}
			}
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
		},

		repository: async () => {
			const response = await axios({
				method: 'post',
				baseURL: 'https://api.github.com/graphql',
				headers: {
					Authorization: `Bearer ${process.env.TOKEN}`
				},
				data: {
					query: queryB,
				}
			}).then((response) => { return response.data })
				.catch((error) => { console.log(error) })

			const repo = await response.data.repository
			const fileCount = repo.object.entries.length
			let yamlContent = ""
			repo.object.entries.forEach(element => {
				if (element.name == "yaml.ts") {
					yamlContent = element.object.text
				}
			});

			const d = {
				name: repo.name,
				owner: repo.owner,
				isPrivate: repo.isPrivate,
				diskUsage: repo.diskUsage,
				object: {
					id: repo.object.id,
					entries: [{
						fileCount: fileCount,
						object: {
							text: yamlContent
						}
					}]
				}
			}
			return d
		}
	}
}

module.exports = resolvers

