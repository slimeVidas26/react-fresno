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