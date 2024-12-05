import React, { useState, useEffect } from "react";
import { fetchTopTracks } from "../services/api";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import "./Home.css";

const Home = () => {
  const [timeRange, setTimeRange] = useState("short_term");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTracks = async () => {
      setLoading(true);
      const data = await fetchTopTracks(timeRange);
      setTracks(data);
      setLoading(false);
    };
    getTracks();
  }, [timeRange]);

  return (
    <div className="home">
      <Dropdown timeRange={timeRange} setTimeRange={setTimeRange} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards">
          {tracks.map((track, idx) => (
            <Card key={idx} track={track} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
