import React, { useState, useEffect } from "react";
import CheckboxList from "./CheckboxList";
import Pagination from "./Pagination";
import Search from "./Search";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [checkedState, setCheckedState] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (page) => {
    if (cachedData[page]) {
      setData(cachedData[page]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_start=${page * 10}&_limit=10`
      );
      let result = await response.json();

      // Remove duplicates based on title
      const uniqueTitles = new Set();
      result = result.filter((item) => {
        if (uniqueTitles.has(item.title)) return false;
        uniqueTitles.add(item.title);
        return true;
      });

      setData(result);
      setCachedData((prev) => ({ ...prev, [page]: result }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleCheckboxChange = (id) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container">
      <h1>Data Fetch with Checkboxes</h1>
      <Search setSearchQuery={setSearchQuery} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CheckboxList
          data={data}
          checkedState={checkedState}
          onCheckboxChange={handleCheckboxChange}
          searchQuery={searchQuery}
        />
      )}
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default App;
