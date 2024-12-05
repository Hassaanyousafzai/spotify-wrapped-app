import React from "react";
import "./Card.css";

const Card = ({ track }) => (
  <div className="card">
    <img src={track.album_cover} alt={track.name} />
    <h2>{track.name}</h2>
    <p>{track.artist}</p>
    <p>{track.album}</p>
    <a href={track.spotify_url} target="_blank" rel="noopener noreferrer">
      Listen on Spotify
    </a>
  </div>
);

export default Card;
