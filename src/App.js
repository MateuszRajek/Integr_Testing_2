import { useState } from 'react';
import { songsList as sl, songsFavNotFav } from './songs'
import './App.css';

function App({songsList = sl}) {
const [updatedSongsList, updateSongsList] = useState(songsList)

const toggleSongFavStatus = clickedIndex => {
  const editedSongsList = [...updatedSongsList]
  editedSongsList[clickedIndex].isFav = !editedSongsList[clickedIndex].isFav
  updateSongsList(editedSongsList)
}

  return (
    <section className='songs-list'>
      <div className='container'>
        <h1>Songs List</h1>
        <div className='songs-wrapper'>
          {updatedSongsList.map((song, index) => {
            return(
              <div 
              className='card' 
              key={`${song.title}-${index}`}
              data-testid={`song-container-${song.title}-${index}`}
              >
                <h2 data-testid={`song-title-${song.title}`}>{song.title}</h2>
                <p data-testid={`song-author-${song.author}`}>{song.author}</p>
                <button 
                  className={song.isFav ? 'btn btn-fav' : 'btn btn-secondary'} 
                  data-testid={'song-btn'}
                  onClick={() => toggleSongFavStatus(index)}
                >
                  {song.isFav ? 'Remove from Fav' : 'Add to Fav'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default App;
