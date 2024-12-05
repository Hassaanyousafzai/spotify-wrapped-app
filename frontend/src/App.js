import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "./styles/app.css";

const App = () => {
  const [timeRange, setTimeRange] = useState("");
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchSongs = async (range) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/top-tracks?time_range=${range}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTracks(data);
      setError(null);
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error fetching songs:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (timeRange) {
      fetchSongs(timeRange);
    }
  }, [timeRange]);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) => Math.min(prev + 1, tracks.length - 1)),
    onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Spotify Wrapped</h1>
        <select
          className="time-range-selector"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="">Select Time Range</option>
          <option value="short_term">Short Term</option>
          <option value="medium_term">Medium Term</option>
          <option value="long_term">Long Term</option>
        </select>
      </header>

      <main className="app-content">
        <div className="scroll-text">
          <span>Spotify</span>
          <span>Wrapped</span>
          <span>Your Wrapped</span>
          <span>Spotify Wrapped</span>
          <span>My Wrapped</span>
          <span>Music</span>
          <span>Get Wrapped</span>
          <span>OG Content</span>
        </div>

        {timeRange === "" ? (
          <div className="welcome-message">
            <h2>Welcome to Your Spotify Wrapped 2024</h2>
            <p>Select a time range above to see your top tracks!</p>
          </div>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : tracks.length > 0 ? (
          <div {...handlers} className="track-swiper">
            <div
              className="track-list"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {tracks.map((track, index) => (
                <div key={index} className="track-card">
                  <img
                    src={track.album_cover}
                    alt={`${track.name} album cover`}
                    className="album-cover"
                  />
                  <div className="track-info">
                    <h3>{track.name}</h3>
                    <p>Artist: {track.artist}</p>
                    <p>Album: {track.album}</p>
                    <a
                      href={track.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen on Spotify
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="no-data-message">Fetching your tracks...</p>
        )}
      </main>
    </div>
  );
};

export default App;
