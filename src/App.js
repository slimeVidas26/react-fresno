import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listSongs } from './graphql/queries'
import { updateSong } from './graphql/mutations'


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
        //console.log("songsList" , songsList)  

    } catch (error) {
        console.log('error on fetching songs', error)
    }
    
}

//addLike

const addLike = async(index)=>{
    try {
        console.log('index' , index)
        const song = songs[index]
        song.like = song.like + 1
        delete song.createdAt;
        delete song.updatedAt
        console.log({song})
    
        const songData  =  await API.graphql(graphqlOperation(updateSong , {input:song}))
        console.log({songData}) 
        const songList = [...songs]
        songList[index]   = songData.data.updateSong
        setSongs(songList)
        console.log({songList})
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
            <div className="songList">
                {songs.map((song , index)=>{
                  return <Paper variant = "outlined" elevation={2} key = {`song${index}`}>
                      <div className="songCard">
                      <IconButton aria-label="play">
                        <PlayArrowIcon />
                        </IconButton>
                        <div>
                          <div className="songTitle">{song.title}</div>
                          <div className="songOwner">{song.owner}</div>
                      </div>

                      <div>
                      <IconButton aria-label="like" onClick = {()=>addLike(index)}>
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