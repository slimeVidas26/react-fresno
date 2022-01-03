import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listSongs } from './graphql/queries'
import './App.css'
import {Paper , IconButton} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { withAuthenticator , AmplifySignOut } from '@aws-amplify/ui-react'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);


 function App() {

    const [songs , setSongs] = useState([])

useEffect(() => {
    fetchSongs()
   
}, [])

const fetchSongs = async()=>{
    try {
        const songsData = await API.graphql(graphqlOperation(listSongs))
        const songsList = songsData.data.listSongs.items
        setSongs(songsList)
        console.log("songsList" , songsList)  

    } catch (error) {
        console.log('error on fetching songs', error)
    }
    
}




    return (
        <div className='App'>
            <header className="App-header">
            <AmplifySignOut />
            <h2>My App Content</h2>
            </header>
            <div className="songList">
                {songs.map((song)=>{
                  return <Paper variant = "outlined" elevation={2}>
                      <div className="songCard">
                      <IconButton aria-label="play">
                        <PlayArrowIcon />
                        </IconButton>
                        <div>
                          <div className="songTitle">{song.title}</div>
                          <div className="songOwner">{song.owner}</div>
                      </div>

                      <div>
                      <IconButton aria-label="like">
                        <FavoriteIcon />
                        </IconButton> 
                        {song.like}
                      </div>

                      <div className="songDescription">{song.description}</div>
                      </div>
                    
                      


                  </Paper>
                })}
            </div>
        </div>
    )
}


export default withAuthenticator(App)