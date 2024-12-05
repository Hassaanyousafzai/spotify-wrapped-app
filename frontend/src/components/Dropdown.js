import React from "react";

const Dropdown = ({ timeRange, setTimeRange }) => (
  <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
    <option value="short_term">Last 4 Weeks</option>
    <option value="medium_term">Last 6 Months</option>
    <option value="long_term">All Time</option>
  </select>
);

export default Dropdown;
