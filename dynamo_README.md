# AWS Amplify - full tutorial series by Complete Coding

 [AWS Amplify](https://www.youtube.com/playlist?list=PLmexTtcbIn_hvPcUm3oAufCtH7dwNAC-g)

## Working with Data in DynamoDB from React with AWS Amplify 

Update the schema.graphql file as:

```javascript

type Song @model {
  id: ID!
  title: String!
  description: String!
  like:Int!
  owner:String!
}
```

### `git add , commit , push`

### `amplify push`