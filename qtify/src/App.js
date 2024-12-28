import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [topAlbumSongs, setTopAlbumSongs] = useState([]);
  const generateTopAlbumSongs = async () => {
    try {
      const topAlbumSongs = await fetchTopAlbums();
      setTopAlbumSongs(topAlbumSongs);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  let BACKEND_ENPOINT = "https://qtify-backend-labs.crio.do";
  const fetchTopAlbums = async () => {
    try {
      const res = await axios.get(`${BACKEND_ENPOINT}/albums/top`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  useEffect(() => {
    generateTopAlbumSongs();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="section">
        <Section type="album" title="Top Albums" data={topAlbumSongs} />
      </div>
    </>
  );
}

export default App;
