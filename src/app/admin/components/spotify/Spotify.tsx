
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login"
import Dashboard from "./Dashboard"


interface SpotifySearchProps {
  accessToken: string;
}


interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  previewUrl: string;
}


const SpotifySearch: React.FC<SpotifySearchProps> = ({ accessToken }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const code = new URLSearchParams(window.location.search).get("code")

  useEffect(() => {
    const searchForTracks = async () => {
      try {
        const response = await axios.get<{ tracks: { items: Track[] } }>(
          `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTracks(response.data.tracks.items);
      } catch (error) {
        console.error('Error searching for tracks:', error);
      }
    };


    if (searchTerm.trim() !== '') {
      searchForTracks();
    }
  }, [searchTerm, accessToken]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };


  const handlePauseTrack = () => {
    setIsPlaying(false);
  };


  function App() {
    return code ? <Dashboard code={code} /> : <Login />
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
            {track.previewUrl && (
              <button
                onClick={() => handlePlayTrack(track)}
                disabled={currentTrack?.id === track.id && isPlaying}
              >
                {currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'}
              </button>
            )}
          </li>
        ))}
      </ul>
      {currentTrack && isPlaying && (
        <audio src={currentTrack.previewUrl} controls onPause={handlePauseTrack} />
      )}
    </div>
  );
};


export default SpotifySearch;
