## **A GraphQL project to search github repositories by utilising Github GraphQL API.**

### **Author: Sayyed Muhammed Yaseen**

### Notes:

1. While querying use your github token.
2. For login variable you can use my username i.e. "ysayyed".
3. Credits: This example uses a repository : "GreenridgeApp" from user : "roma8389".
4. Run following command to install dependencies:

```
npm install
```

5. Use following command to start the server:

```
npm start
```

6. You can also include Graphiql client or Graphql playground. Install the required dependencies and include it in definition of server and add it inside plugins.

**Query samples:**

1. Query A:

```
query listRepositories($login: String!) {
  user(login: $login) {
    name
    repositories(last: 3) {
      nodes {
        name
        isPrivate
        diskUsage
        owner {
          login
        }
      }
    }
  }
}

```

2. Query B:

```
query repositoryDetails{
  repository(name: "GreenridgeApp", owner: "roma8389") {
    name
    owner {
      login
    }
    isPrivate
    diskUsage
    object(expression: "master:src") {
      entries {
        fileCount
        object {
          text
        }
      }
    }
  }
}
```
