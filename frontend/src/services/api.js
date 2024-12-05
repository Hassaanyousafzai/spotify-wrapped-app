import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Backend URL

export const fetchTopTracks = async (timeRange) => {
    const response = await axios.get(`${API_URL}/top-tracks`, {
        params: { time_range: timeRange },
    });
    return response.data;
};
