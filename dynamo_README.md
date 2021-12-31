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

## Create fetchSongs function in App.js

```jsx
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listSongs } from './graphql/queries'
import './App.css'

import { withAuthenticator , AmplifySignOut } from '@aws-amplify/ui-react'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);




 function App() {

useEffect(() => {
    fetchSongs()
    return () => {
        "Songs"
    }
}, [])

const fetchSongs = async()=>{
    try {
        const songsData = await API.graphql(graphqlOperation(listSongs))
        console.log('songsData' , songsData)
        const songsList = songsData.data.listSongs.items
        console.log("songsList" , songsList)  
    } catch (error) {
        console.log(error)
    }
    
}




    return (
        <div className='App'>
            <header className="App-header">
            <AmplifySignOut />
            <h2>My App Content</h2>
            </header>
        </div>
    )
}


export default withAuthenticator(App)

```